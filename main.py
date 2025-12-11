"""Application entrypoint for the GORDO CONTROL ROOM API."""

from __future__ import annotations

import uvicorn
from fastapi import FastAPI

from app.api import router
from app.config import get_settings


settings = get_settings()
app = FastAPI(title=settings.app_name, debug=settings.debug)
app.include_router(router)


def run() -> None:
    """Run the Uvicorn server locally."""

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)


if __name__ == "__main__":
    run()
