from fastapi import APIRouter, HTTPException
from ....schemas.pipeline import PipelineRequest, PipelineResponse
from ....services.pipeline.pipeline import run_pipeline  # import the function directly

router = APIRouter()

# Use empty path so both "/v1/pipeline" and "/v1/pipeline/" work without redirects
@router.post("", response_model=PipelineResponse, summary="Run full text processing pipeline")
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
