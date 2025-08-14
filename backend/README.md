# TLDR API Backend

This repository contains the backend API for the **TLDR** app, which summarizes long text and generates quiz questions based on the summary. The API is built with **FastAPI**, powered by **LangChain** and **OpenAI GPT-5 Mini**.

## How to Start

```bash
python -m venv backend/venv
source backend/venv/bin/activate  # Windows: backend\\venv\\Scripts\\activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```

## Features

- Summarizes arbitrarily long text documents
- Generates multiple-choice or True/False quizzes from summaries
- Handles large documents by chunking and merging
- Fully structured JSON responses

## API Endpoints

### `POST /v1/pipeline/`

Processes text through the pipeline:

- **Request Body:**

```
{
  "text": "Your input text here..."
}
```

- **Response:**

```
{
  "summary": "Concise summary of input text.",
  "quiz": [
    {
      "question": "True or False: Example sentence from summary.",
      "options": [
        {"label": "True", "is_correct": true},
        {"label": "False", "is_correct": false}
      ]
    }
  ]
}
```

## Tech Stack

- **Backend:** FastAPI, Python 3.11
- **LLM Integration:** LangChain, OpenAI GPT-5 Mini
- **Environment Management:** python-dotenv
- **Text Processing:** RecursiveCharacterTextSplitter