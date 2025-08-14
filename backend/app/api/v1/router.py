from fastapi import APIRouter
from .endpoints.health import router as health_router
from .endpoints.pipeline import router as pipeline_router

api_router = APIRouter()

@api_router.get("/", summary="v1 API Root", tags=["v1"])
def v1_root():
    """
    Root endpoint for API version 1.

    Returns information about available endpoints and expected input/output formats for v1.
    """
    return {
        "message": "Welcome to the v1 Summarizer + Quiz API!",
        "endpoints": {
            "/pipeline": {
                "method": "POST",
                "description": "Submit text to get a summary and a quiz.",
                "input": {
                    "text": "string (the text you want summarized and quizzed)"
                },
                "output": {
                    "summary": "string (concise summary of the text)",
                    "questions": [
                        {
                            "question": "string",
                            "choices": ["string", "string", "..."],
                            "answer": "string"
                        }
                    ]
                }
            }
        }
    }
    

api_router.include_router(health_router, tags=["health"])
api_router.include_router(pipeline_router, prefix="/pipeline", tags=["pipeline"])
