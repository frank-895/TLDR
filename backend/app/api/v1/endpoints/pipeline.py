from fastapi import APIRouter, HTTPException
from ....schemas.pipeline import PipelineRequest, PipelineResponse
from ....services.pipeline.pipeline import run_pipeline  # import the function directly

router = APIRouter()

@router.post("/", response_model=PipelineResponse, summary="Run full text processing pipeline")
def run_pipeline_endpoint(request: PipelineRequest) -> PipelineResponse:
    """
    Accepts a large text input, summarizes it, and generates a quiz.
    """
    try:
        # Call the modular pipeline
        return run_pipeline(request)
    except Exception as exc:
        # Return a friendly HTTP error
        raise HTTPException(status_code=500, detail=f"Pipeline processing failed: {str(exc)}")
