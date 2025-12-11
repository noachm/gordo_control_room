# 🦂 GORDO CONTROL ROOM™ — Classified Operator Dossier

> This is not a chatbot. This is a war engine disguised as software. Proceed like you stole a billionaire's favorite toy.

## 1. 🦂 GORDO CONTROL ROOM™ — Overview
GORDO CONTROL ROOM™ is a local-only Conversation, Psychology & Power-Dynamics Engine built for operators who live in the shadows. It fuses CIA Red Cell psychology, negotiation science, social engineering pattern analysis, business intelligence, and the Laws of Power into a single, surgical machine. Use it to dissect conversations, map leverage, and script precision responses — all without letting a byte leak to the cloud. Elite tacticians, fixers, and corporate dark-arts strategists only.

## 2. 🧠 Core Capabilities
- Conversation summarization with ruthless brevity
- Power mapping of frame, leverage, and positional advantage
- Psychological profiling of all parties
- Strategy generation across Diplomat / Operator / Cold Steel modes
- Reply script generation for field deployment
- Local-only privacy — your data never leaves your bunker
- API-first design, ready for any stack
- Future-ready dashboard layer for war-room visuals

## 3. ⚙️ System Architecture
```
+-----------------------------+          +-----------------------+
|        Input Payload        |          |  War Room Dashboard   |
| (case, roles, logs, tags)   |          |  (optional GUI layer) |
+--------------+--------------+          +-----------+-----------+
               |                                     ^
               v                                     |
       +-------+----------+               +----------+----------+
       |   Analysis Engine| --JSON-->     |    API Layer        |
       |  (Power, Psych,  | <----HTTP---- | (FastAPI, local)    |
       |   Strategies)    |               +---------------------+
       +-------+----------+
               |
               v
      +--------+---------+
      |  JSON Intelligence|
      +-------------------+
```

Brain Loop: prompt construction → OpenAI JSON response → schema validation → strategy mapping → reply scripts → dashboard render.

## 4. 🔥 Features in Detail
### 🧠 Analysis Engine
- Forces JSON-only responses for deterministic parsing
- System prompts define roles, boundaries, and ethics
- Strict schema alignment to AnalysisResult
- Fallback logic if the model misbehaves

### 🦂 Power Dynamics Module
- Detects frame control and who owns the narrative
- Surfaces leverage points and positional strength
- Flags behavioral patterns worth exploiting or defending

### 🎛 Strategy Generator
- Diplomat: velvet-glove persuasion
- Operator: tactical firmness with charm
- Cold Steel: decisive moves with zero fluff

### 💬 Response Scripter
- Auto-builds reply scripts per tone
- Tabbed tone switching for rapid field use
- Pragmatic language ready to copy into battle

### 🔒 Privacy & Security Model
- Local-only runtime; no external logging
- Operator-controlled secrets via .env
- Minimal attack surface; API-first, GUI optional

## 5. 🛠 Installation & Setup
```bash
# Clone
git clone <private-repo-url>
cd gordo_control_room

# Python venv
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# Install backend deps
pip install -r requirements.txt

# Configure secrets
cp .env.example .env
# edit .env with your OPENAI_API_KEY, model, and debug flag

# Run backend
python main.py

# Health check
curl http://localhost:8000/api/health

# Send a live analysis
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "case_title": "Whale delaying payout again",
    "your_role": "Advisor",
    "other_party_role": "Founder",
    "goal": "Secure release of funds",
    "context": "Longstanding payout stalled for weeks",
    "conversation_log": "Founder keeps promising next week",
    "priority": "high",
    "preferred_tone": "operator",
    "tags": ["payments", "trust"]
  }'
```

## 6. 📡 API Usage Guide
### POST `/api/analyze`
Request body (JSON):
```json
{
  "case_title": "string",
  "your_role": "string",
  "other_party_role": "string",
  "goal": "string",
  "context": "string",
  "conversation_log": "string",
  "priority": "low | normal | high",
  "preferred_tone": "diplomat | operator | cold_steel | null",
  "tags": ["string"]
}
```

Response example:
```json
{
  "case_title": "Whale delaying payout again",
  "summary": "Founder is stalling; leverage exists via timeline pressure and alternatives.",
  "power_dynamics": {
    "frame_holder": "other_party",
    "your_position": "advisor with optional alternatives",
    "other_party_position": "cash-holder resisting commitment",
    "notes": "Escalate deadlines, introduce consequence, keep rapport warm."
  },
  "psychology": {
    "you": {
      "style": "structured, pragmatic",
      "risks": ["appearing impatient", "over-rotating to threats"],
      "leverage": ["alternative offers", "timeline clarity"]
    },
    "other_party": {
      "style": "avoidant, image-conscious",
      "risks": ["public embarrassment", "cash flow constraints"],
      "leverage": ["desire for reputation", "need to retain advisory support"]
    }
  },
  "strategies": [
    {
      "id": "operator",
      "label": "Firm Timeline with Options",
      "description": "Set a hard date, outline alternatives if unmet.",
      "risk_level": "medium",
      "reward_profile": "high",
      "when_to_use": "When stalling persists beyond agreed windows."
    }
  ],
  "suggested_replies": {
    "diplomat": ["Appreciate the update — let's align on an exact release date."],
    "operator": ["Need confirmation: funds cleared by Friday. If not, I'll proceed with the backup path."],
    "cold_steel": ["Funds land by Friday 1700. Otherwise we trigger the alternate execution." ]
  },
  "meta": {
    "model_used": "gpt-4.1-mini",
    "generated_at": "2024-06-01T12:34:56Z",
    "fallback": false
  }
}
```

Fields explained: summary (high-level read), power_dynamics (frame + positions), psychology (profiles & leverage), strategies (action menu), suggested_replies (ready-to-send scripts), meta (model + timestamp + fallback flag).

## 7. 🧩 Example Workflow (Operator Scenario)
**Scenario:** Whale delaying payout again.

1. Input the stalled payout conversation and set priority to high, tone to Operator.
2. Engine returns leverage points (timeline pressure, alternatives) and a firm strategy card.
3. Operator copies the Operator reply: “Need confirmation: funds cleared by Friday. If not, I'll proceed with the backup path.”
4. Outcome: pressure applied, clarity enforced, fallback path armed. Mission moves.

## 8. 🎨 Future Add-ons (Roadmap)
- React dashboard (Gordo HUD) for live ops
- Telegram live-ops bridge
- Case memory and recall system
- Multi-party power graphing
- Influence simulation sandbox
- PDF export for "Gordo Briefings™"

## 9. 🔒 Legal, Ethical & Operational Notes
- Use for ethical negotiation and strategy only
- No harassment, illegality, or surveillance
- Maintain consent and compliance in every engagement
- Designed for awareness, not coercion
- Everything runs local; you own the logs

## 10. 🦂 Signature / Branding Footer
Engineered for dominance. Wield carefully. — **GORDO CONTROL ROOM™**
