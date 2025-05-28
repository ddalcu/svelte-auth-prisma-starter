import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import Email from "@auth/sveltekit/providers/email";
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
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
    Email({
      server: {
        host: "localhost",
        port: 1025,
        auth: {
          user: "",
          pass: ""
        }
      },
      from: "noreply@example.com",
      async sendVerificationRequest({ identifier, url }) {
        console.log(`Magic Link for ${identifier}: ${url}`);
      },
    }),
	],
  trustHost: true,
	adapter: PrismaAdapter(prisma),
  debug: true,
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
      }
    }
});
