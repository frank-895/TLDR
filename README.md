# TLDR 📚✂️

**TLDR** is a full-stack application that takes long-form text, summarizes it into a concise, engaging format, and generates interactive quizzes to test comprehension.

## 🚀 Features

- **Summarization** of arbitrarily long documents with chunking + intelligent merging
- **Quiz Generation** with multiple-choice questions matching the text’s complexity
- **Structured Output Enforcement** (guaranteed valid JSON)
- **Clean Modular Architecture** separating summarization, quiz generation, and orchestration
- **Fast Iteration** with Vite + Tailwind for frontend, FastAPI for backend
- **LLM Power** from OpenAI GPT-5-mini

## 🛠️ Tech Stack

### Backend
- **FastAPI** – Modern Python API framework
- **LangChain** – Prompt engineering, LLM orchestration, structured outputs

### Frontend
- **React + Vite** – Lightning-fast dev environment
- **Tailwind CSS** – Utility-first styling

## 📂 Repositories

- [Backend API](./backend/README.md) – FastAPI + LangChain summarization & quiz service
- [Frontend](./frontend/README.md) – React + Tailwind app for user interaction

## 🏗️ Getting Started

### Option 1: Docker Development (Recommended)

1. **Clone the repo**
```bash
git clone https://github.com/your-username/tldr.git
cd tldr
```

2. **Create environment file**
Create a `.env` file in the project root with:
```bash
# Backend Configuration
ENV=development
LOG_LEVEL=info
OPENAI_API_KEY=your_openai_api_key_here
API_AUTH_KEY=your_api_auth_key_here

# Frontend Configuration
VITE_API_URL=http://localhost:8000
```

3. **Start with Makefile commands**
```bash
# Start all services
make up

# Start services in background
make up-d

# View logs
make logs

# Stop services
make down

# Rebuild and restart
make restart
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

**Available Makefile Commands:**
```bash
make up          # Start all services
make up-d        # Start services in background
make down        # Stop all services
make restart     # Rebuild and restart services
make logs        # View service logs
make clean       # Remove containers and volumes
make build       # Build all services
```

### Option 2: Local Development

1. **Clone the repo**
```bash
git clone https://github.com/your-username/tldr.git
```

2. **Backend setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

3. **Frontend setup**
```bash
cd frontend
pnpm install
pnpm dev
```

## 📜 License
SEE [LICENSE](LICENSE)
