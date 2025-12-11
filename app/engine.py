"""Core analysis engine orchestrating OpenAI calls."""

from __future__ import annotations

import asyncio
import json
from typing import Any

from openai import OpenAI

from .config import Settings
from .models import (
    AnalysisRequest,
    AnalysisResult,
    PartyPsychProfile,
    PowerDynamics,
    PsychologyBlock,
    StrategyOption,
    SuggestedReplies,
)


class AnalysisEngine:
    """Generate strategic conversation analysis using OpenAI models."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.client = OpenAI(api_key=settings.openai_api_key)

    async def analyze(self, req: AnalysisRequest) -> AnalysisResult:
        """Run the analysis flow against the configured model."""

        system_prompt = (
            "You are the GORDO CONTROL ROOM analysis module: a negotiation, psychology, "
            "and power-dynamics advisor. Provide strategic insight within ethical and "
            "legal boundaries. Avoid coercion or unlawful manipulation. Return a JSON "
            "object that matches the AnalysisResult schema precisely."
        )

        user_payload = {
            "case_title": req.case_title,
            "your_role": req.your_role,
            "other_party_role": req.other_party_role,
            "goal": req.goal,
            "context": req.context,
            "conversation_log": req.conversation_log,
            "priority": req.priority,
            "preferred_tone": req.preferred_tone,
            "tags": req.tags,
        }

        messages = [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": (
                    "Analyze the conversation and return strategy guidance as JSON: "
                    f"{json.dumps(user_payload)}"
                ),
            },
        ]

        try:
            completion = await asyncio.to_thread(
                self.client.chat.completions.create,
                model=self.settings.openai_model,
                messages=messages,
                response_format={"type": "json_object"},
                temperature=0.7,
            )
            content = completion.choices[0].message.content or "{}"
            data: dict[str, Any] = json.loads(content)
            return AnalysisResult(**data)
        except Exception:
            return self._fallback_response(req)

    def _fallback_response(self, req: AnalysisRequest) -> AnalysisResult:
        """Return a safe default analysis when parsing or API calls fail."""

        power_dynamics = PowerDynamics(
            frame_holder="mixed",
            your_position="uncertain",
            other_party_position="uncertain",
            notes="Power dynamics could not be fully assessed from the provided data.",
        )
        psychology = PsychologyBlock(
            you=PartyPsychProfile(
                style="adaptive",
                risks=["Insufficient data to identify risks."],
                leverage=["Clarify goals and gather more context."],
            ),
            other_party=PartyPsychProfile(
                style="unknown",
                risks=["Limited visibility into other party's motives."],
                leverage=["Seek more dialogue to uncover intentions."],
            ),
        )
        strategies = [
            StrategyOption(
                id="stabilize",
                label="Stabilize the conversation",
                description="Pause, summarize positions, and seek mutual clarity.",
                risk_level="low",
                reward_profile="Establishes baseline understanding.",
                when_to_use="Use when analysis output is unavailable or ambiguous.",
            )
        ]
        suggested_replies = SuggestedReplies(
            diplomat=["I want to ensure we both understand the goals. Could we restate them?"],
            operator=["Let's align on actionable next steps based on what we know."],
            cold_steel=["We lack clarity. Provide specifics so we can proceed efficiently."],
        )

        return AnalysisResult(
            case_title=req.case_title,
            summary="Model response could not be parsed as JSON.",
            power_dynamics=power_dynamics,
            psychology=psychology,
            strategies=strategies,
            suggested_replies=suggested_replies,
            meta={
                "fallback": True,
                "reason": "LLM response parse failure or request error.",
            },
        )


__all__ = ["AnalysisEngine"]
