from fastapi import APIRouter, HTTPException

from ....schemas.pipeline import PipelineRequest, PipelineResponse
from ....services import pipeline as pipeline_service


router = APIRouter()


@router.post("/", response_model=PipelineResponse)
def run(request: PipelineRequest) -> PipelineResponse:
	try:
		return pipeline_service.run_pipeline(request)
	except Exception as exc:  # noqa: BLE001 - bubble user-friendly error for now
		raise HTTPException(status_code=500, detail=str(exc))
