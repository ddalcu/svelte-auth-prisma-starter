import { SvelteKitAuth } from '@auth/sveltekit';
import DiscordProvider from '@auth/core/providers/discord';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { Handle } from '@sveltejs/kit';

declare module '@auth/core/types' {
  interface Session {
    user: {
      name: string;
      image: string | null | undefined;
      role?: string;
      id?: string;
    };
  }

  interface JWT {
    role?: string;
    id?: string;
  }
}

const prisma = new PrismaClient();

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET
		})
	],
  trustHost: true,
	adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, user }) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email ?? undefined },
          });
          if (dbUser) {
            session.user.role = dbUser.role ?? undefined;
            session.user.id = dbUser.id;
          }
          return session;
        },
        async jwt({token, user}) {
          if (user) {
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email ?? undefined },
            });
            if (dbUser) {
              token.role = dbUser.role; // Add role to JWT token
              token.id = dbUser.id; // Add id to session
            }
          }
          return token;
        },
      }
});
