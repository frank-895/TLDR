from fastapi import APIRouter
from .endpoints.health import router as health_router
from .endpoints.pipeline import router as pipeline_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(pipeline_router, prefix="/pipeline", tags=["pipeline"])
