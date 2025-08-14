from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pathlib import Path
from dotenv import load_dotenv
import os


"""
Centralized config loaded from environment/.env.

We proactively load .env from either project root or backend root so it
works regardless of where Uvicorn is started from.
"""

# Pre-load potential .env locations into process env for BaseSettings to read
_project_root = Path(__file__).resolve().parents[3]  # .../TLDR
_backend_root = _project_root / "backend"

for dotenv_path in ( _project_root / ".env", _backend_root / ".env" ):
    if dotenv_path.exists():
        load_dotenv(dotenv_path, override=False)


class Settings(BaseSettings):
    app_name: str = "TLDR API"
    env: str = "development"
    log_level: str = "info"
    cors_allow_origins: List[str] = ["*"]
    openai_api_key: str = ""

    model_config = SettingsConfigDict(
        # We already loaded .env files above; keep env_file to support direct usage
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


settings = Settings()
