"""Application configuration using environment variables."""

from __future__ import annotations

import os
from functools import lru_cache

from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load environment variables from a local .env file if present.
load_dotenv()


class Settings(BaseModel):
    """Strongly-typed application settings."""

    openai_api_key: str = Field(default_factory=lambda: os.getenv("OPENAI_API_KEY", ""))
    openai_model: str = Field(default_factory=lambda: os.getenv("OPENAI_MODEL", "gpt-4.1-mini"))
    app_name: str = Field(default_factory=lambda: os.getenv("APP_NAME", "GORDO CONTROL ROOM"))
    debug: bool = Field(default_factory=lambda: os.getenv("APP_DEBUG", "false").lower() == "true")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a singleton Settings instance for dependency injection."""

    return Settings()


__all__ = ["Settings", "get_settings"]
