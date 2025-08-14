from fastapi import Header, HTTPException, status, Depends
from ..core.config import settings


def require_api_key(x_api_key: str | None = Header(default=None)) -> None:
    expected = (settings.api_auth_key or "").strip()
    if not expected:
        # If not configured, reject to avoid accidental public exposure in prod
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="API is not configured")
    if (x_api_key or "").strip() != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing API key")


