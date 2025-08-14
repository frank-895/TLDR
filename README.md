# TLDR
Your personal AI for instant understanding.

## Features
- Summarize long-form text into concise takeaways
- Generate multiple-choice or true/false quizzes from the summary
- One-page frontend with a simple input form and results display
- JSON-first backend responses for easy consumption

## Tech Stack
- Backend: `FastAPI` (Python), LangChain, OpenAI
- Frontend: `Vite` + `React` + `Tailwind CSS`
- Package manager: `pnpm`

## How to Start (brief)
1) Backend
```bash
python -m venv backend/venv
source backend/venv/bin/activate  # Windows: backend\\venv\\Scripts\\activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```

2) Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

3) Open the app
- Frontend dev server: `http://localhost:5173`
- API root: `http://localhost:8000/` (v1 under `/v1`)

