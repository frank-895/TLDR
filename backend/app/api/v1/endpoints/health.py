from fastapi import APIRouter

from ....schemas.health import HealthResponse


router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
	return HealthResponse()
