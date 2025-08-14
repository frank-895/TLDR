# TLDR Frontend 
One-page app scaffolded to work with the FastAPI backend. Tailwind is configured and a `Home` page is wired up with a simple form that calls the `/v1/pipeline` endpoint through a dev proxy (`/api`).

### How to Start (pnpm)
- `pnpm dev`: start Vite dev server at `http://localhost:5173`
- `pnpm build`: production build
- `pnpm preview`: preview production build

## Features
- Proxy is set in `vite.config.js` so frontend requests to `/api/*` are forwarded to `http://localhost:8000/*`.

## Tech Stack
- Vite
- React
- Tailwind