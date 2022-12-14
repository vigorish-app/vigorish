# Vigorish

Vigorish is a webapp to set personal wagers and assign probabilities to outcomes.

![image](https://user-images.githubusercontent.com/2160795/209411343-26435a74-6619-48ac-acb0-34e008b76b69.png)

## Development

First bring up the database:

```bash
docker-compose up
```

This will bring up the postgres database in docker and expose the
default postgres port (5432) to localhost.

Then, run the development server locally

```bash
npm run dev
# or
yarn dev
```

This will pick up the database configuration of .env.development
(it will use .env.local if that is available as well).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Styling

We use [Tailwind](https://tailwindcss.com/) for styling. We also use
[Flowbite](https://flowbite.com/) and [Flowbite
React](https://flowbite-react.com/), which are built on Tailwind.
