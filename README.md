# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy on Vercel

1. In Lovable: **Project settings → Git → Connect GitHub**. This creates a new private
   repository and keeps it in sync with every change made here.
2. On Vercel: **Add New → Project → Import** that GitHub repository.
3. Add these environment variables in Vercel (names are listed in `.env.example`;
   paste the real values in the Vercel dashboard, do not commit them):
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`,
   `SUPABASE_PUBLISHABLE_KEY`. For the `/edit` unlock screen also set
   `VITE_EDIT_PASSWORD`.
4. Deploy. The build target is chosen automatically: Vercel's own target on Vercel,
   Cloudflare inside Lovable.

No secret key is needed. The `/edit` password is verified inside the database, so
edits made on Vercel are saved for everyone.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
