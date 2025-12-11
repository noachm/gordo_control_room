"""Data models for the GORDO CONTROL ROOM analysis engine."""

from __future__ import annotations

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class Tone(str, Enum):
    """Communication tone options for strategy suggestions."""

    DIPLOMAT = "diplomat"
    OPERATOR = "operator"
    COLD_STEEL = "cold_steel"


class AnalysisRequest(BaseModel):
    """Inbound payload describing the conversation case to analyze."""

    case_title: str
    your_role: str
    other_party_role: str
    goal: str
    context: str
    conversation_log: str
    priority: str = "normal"
    preferred_tone: Optional[Tone] = None
    tags: list[str] = Field(default_factory=list)


class PowerDynamics(BaseModel):
    """Power posture summary between the parties."""

    frame_holder: str
    your_position: str
    other_party_position: str
    notes: str


class PartyPsychProfile(BaseModel):
    """Psychological profile of a conversation party."""

    style: str
    risks: list[str] = Field(default_factory=list)
    leverage: list[str] = Field(default_factory=list)


class PsychologyBlock(BaseModel):
    """Psychological insights for both parties."""

    you: PartyPsychProfile
    other_party: PartyPsychProfile


class StrategyOption(BaseModel):
    """Possible negotiation strategies."""

    id: str
    label: str
    description: str
    risk_level: str
    reward_profile: str
    when_to_use: str


class SuggestedReplies(BaseModel):
    """Tone-specific reply templates."""

    diplomat: list[str] = Field(default_factory=list)
    operator: list[str] = Field(default_factory=list)
    cold_steel: list[str] = Field(default_factory=list)


class AnalysisResult(BaseModel):
    """Full analysis result returned to the API consumer."""

    case_title: str
    summary: str
    power_dynamics: PowerDynamics
    psychology: PsychologyBlock
    strategies: list[StrategyOption]
    suggested_replies: SuggestedReplies
    meta: dict


__all__ = [
    "Tone",
    "AnalysisRequest",
    "PowerDynamics",
    "PartyPsychProfile",
    "PsychologyBlock",
    "StrategyOption",
    "SuggestedReplies",
    "AnalysisResult",
]
