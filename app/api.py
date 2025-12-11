"""FastAPI routes for the analysis service."""

from __future__ import annotations

from functools import lru_cache
from typing import Annotated

from fastapi import APIRouter, Depends

from .config import Settings, get_settings
from .engine import AnalysisEngine
from .models import AnalysisRequest, AnalysisResult

router = APIRouter(prefix="/api", tags=["analysis"])


@lru_cache(maxsize=1)
def get_engine(settings: Settings) -> AnalysisEngine:
    """Create a singleton analysis engine for reuse across requests."""

    return AnalysisEngine(settings)


SettingsDep = Annotated[Settings, Depends(get_settings)]
EngineDep = Annotated[AnalysisEngine, Depends(lambda settings: get_engine(settings))]


@router.post("/analyze", response_model=AnalysisResult)
async def analyze(req: AnalysisRequest, engine: EngineDep) -> AnalysisResult:
    """Run the analysis engine on the provided conversation data."""

    return await engine.analyze(req)


@router.get("/health")
def health(settings: SettingsDep) -> dict[str, str]:
    """Lightweight health probe endpoint."""

    return {"status": "ok", "app": settings.app_name}


__all__ = ["router"]
