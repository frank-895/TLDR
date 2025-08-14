# TLDR 📚✂️

**TLDR** is a full-stack application that takes long-form text, summarizes it into a concise, engaging format, and generates interactive quizzes to test comprehension.

This project demonstrates **end-to-end AI application development** using modern frameworks, robust API design, and advanced LangChain techniques.

## 🚀 Features

- **Summarization** of arbitrarily long documents with chunking + intelligent merging
- **Quiz Generation** with multiple-choice questions matching the text’s complexity
- **Structured Output Enforcement** (guaranteed valid JSON)
- **Clean Modular Architecture** separating summarization, quiz generation, and orchestration
- **Fast Iteration** with Vite + Tailwind for frontend, FastAPI for backend
- **LLM Power** from OpenAI GPT-4o-mini (backend-ready for GPT-5 family)

## 🛠️ Tech Stack

### Backend
- **FastAPI** – Modern Python API framework
- **LangChain** – Prompt engineering, LLM orchestration, structured outputs
- **OpenAI GPT-5-mini** – Low-latency, high-quality LLM
- **RecursiveCharacterTextSplitter** – Large document handling

### Frontend
- **React + Vite** – Lightning-fast dev environment
- **Tailwind CSS** – Utility-first styling
- **React Markdown** – Rich rendering of LLM-generated markdown
- **API Proxy** – Seamless dev integration with backend
- **pnpm** – Efficient, disk-space-saving package manager with strict dependency resolution

## 🧠 Skills Demonstrated

- **Prompt engineering** (multi-step chunking & merging strategies)
- **LangChain structured output parsing** (Quiz JSON validation)
- **Modular, testable pipeline architecture**
- **Async and parallel processing** readiness for large workloads
- **Frontend-backend API integration**
- **Environment configuration & secret management**

## 🔮 Future Enhancements

Planned improvements to showcase advanced LangChain + AI engineering skills:

- **Streaming LLM responses** for real-time summary/quiz rendering
- **Parallel chunk processing** for faster large-document summarization
- **LangSmith tracing** for debugging and performance insights
- **Custom prompt injection defenses** via system/human role structuring
- **Vector search integration** for context-aware summarization
- **Document handling** for .docx, .txt, etc. upload
- **Deployment** of both backend and frontend with user uploaded API key

## 📂 Repositories

- [Backend API](./backend/README.md) – FastAPI + LangChain summarization & quiz service
- [Frontend](./frontend/README.md) – React + Tailwind app for user interaction

## 🏗️ Getting Started

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