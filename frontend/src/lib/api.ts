import axios from 'axios';

export type Tone = 'diplomat' | 'operator' | 'cold_steel';

export interface AnalysisRequest {
  case_title: string;
  your_role: string;
  other_party_role: string;
  goal: string;
  context: string;
  conversation_log: string;
  priority: string;
  preferred_tone: Tone | null;
  tags: string[];
}

export interface PowerDynamics {
  frame_holder: string;
  your_position: string;
  other_party_position: string;
  notes: string;
}

export interface PartyPsychProfile {
  style: string;
  risks: string[];
  leverage: string[];
}

export interface PsychologyBlock {
  you: PartyPsychProfile;
  other_party: PartyPsychProfile;
}

export interface StrategyOption {
  id: string;
  label: string;
  description: string;
  risk_level: string;
  reward_profile: string;
  when_to_use: string;
}

export interface SuggestedReplies {
  diplomat: string[];
  operator: string[];
  cold_steel: string[];
}

export interface MetaBlock {
  model_used?: string;
  generated_at?: string;
  fallback?: boolean;
  [key: string]: unknown;
}

export interface AnalysisResult {
  case_title: string;
  summary: string;
  power_dynamics: PowerDynamics;
  psychology: PsychologyBlock;
  strategies: StrategyOption[];
  suggested_replies: SuggestedReplies;
  meta: MetaBlock;
}

const API_BASE = 'http://localhost:8000';

export async function analyzeCase(payload: AnalysisRequest): Promise<AnalysisResult> {
  const response = await axios.post<AnalysisResult>(`${API_BASE}/api/analyze`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
