# TLDR API Backend

This is the backend API for the **TLDR** app — a summarization and quiz generation service built with **FastAPI**, **LangChain**, and **OpenAI GPT-4o-mini**.


## ⚡ Features

- **Summarizes large documents** via chunking + merging
- **Generates multiple-choice quizzes** based on summaries
- **Structured JSON output** guaranteed to match schemas
- **Prompt engineering** for engaging, scannable summaries (sections, bullet points, emojis)
- **Clean modular design**: `summarize_text()` and `generate_quiz()` are isolated for maintainability
- **Streaming responses** for real-time summary delivery


## 🛠️ Tech Stack

- **Backend Framework:** FastAPI, Python 3.11
- **LLM Orchestration:** LangChain
- **Model:** OpenAI GPT-4o-mini
- **Utilities:** RecursiveCharacterTextSplitter, python-dotenv

## 📡 API Endpoints

### `POST /v1/pipeline/`
Processes text through the summarization + quiz pipeline.

**Request Body:**
```json
{
  "text": "Your input text here..."
}
```

**Response:**
```json
{
  "summary": "Concise, engaging summary.",
  "quiz": [
    {
      "question": "Example question?",
      "options": [
        {"label": "A", "is_correct": true},
        {"label": "B", "is_correct": false},
        {"label": "C", "is_correct": false},
        {"label": "D", "is_correct": false}
      ]
    }
  ]
}
```

## 🚀 Getting Started
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## 🔮 Future Enhancements
- Parallel chunk processing
- LangSmith tracing for debugging & metrics
- API key authentication