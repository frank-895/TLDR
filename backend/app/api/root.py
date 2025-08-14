from fastapi import APIRouter

router = APIRouter()

@router.get("/", summary="TL;DR API Overview", tags=["info"])
def api_tldr():
    """
    TL;DR overview of the project.

    Provides a short summary of the application and mentions the existence of v1.
    """
    return {
        "project": "TLDR: Summarizer + Quiz API",
        "description": "This API accepts any text, summarizes it, extracts key insights, and generates an interactive quiz.",
        "version_info": "The detailed API v1 endpoints are available under /v1/"
    }

@router.get("/health", summary="Health Check", tags=["health"])
def health_check():
    """
    Health check endpoint for Docker and monitoring.
    """
    return {"status": "healthy", "service": "TLDR API"}
