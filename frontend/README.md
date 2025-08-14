# TLDR Frontend

A single-page application for the **TLDR** backend, built with **React**, **Vite**, and **Tailwind CSS**.

## 🎯 Features

- **Form-based interface** to submit text to `/v1/pipeline`
- **Live rendering** of summaries with Markdown styling
- **Quiz display** from structured backend JSON
- **Dev Proxy** in `vite.config.js` routes `/api/*` to `http://localhost:8000/*`
- **Streaming UI** updates for partial summaries


## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (with typography plugin)
- **Rendering:** React Markdown
- **Integration:** API proxy for seamless backend communication

## 🚀 Getting Started

We use **pnpm** for dependency management — it's faster, more disk-efficient, and enforces strict dependency rules.

```bash
pnpm install
pnpm dev
```
Visit: [http://localhost:5173](http://localhost:5173)

## 🔮 Future Enhancements
- Mobile-optimized layout
- Document handling for reports, presentations, spreadsheets