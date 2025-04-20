# sv

Everything you need to build a Svelte project.

* Prisma ORM
* AuthJS
* Sqlite

## Developing

Create a .env file
```
DATABASE_URL="file:./dev.db"
AUTH_SECRET=xxxx
DISCORD_CLIENT_ID=xxxx
DISCORD_CLIENT_SECRET=xxx
```

Run the project
```
npm install
npx prisma migrate dev --name init
npx prisma generate dev
npm run dev
```

### Magic Link Authentication (Local Development)

Magic link authentication is set up for local development:

1. Access the login page at `/login` and use the "Sign in with Email" option

2. Enter any email address

3. The magic link will be output directly to your console logs, like this:
```
----- MAGIC LINK EMAIL -----
To: your@email.com
Magic Link: http://localhost:5173/auth/callback/email?...
-----------------------------
```

4. Copy and paste the magic link into your browser to log in

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
