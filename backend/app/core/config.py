from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    app_name: str = "TLDR API"
    env: str = "development"
    log_level: str = "info"
    cors_allow_origins: List[str] = ["*"]
    openai_api_key: str = ""

    model_config = SettingsConfigDict(
        env_file="backend/.env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


settings = Settings()
