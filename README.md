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
npx prisma generate dev
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
