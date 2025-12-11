import { FormEvent, useState } from 'react';
import { AnalysisRequest, Tone } from '../lib/api';

interface Props {
  onSubmit: (payload: AnalysisRequest) => Promise<void>;
  loading: boolean;
}

const toneOptions: (Tone | null)[] = [null, 'diplomat', 'operator', 'cold_steel'];

export default function CaseForm({ onSubmit, loading }: Props) {
  const [caseTitle, setCaseTitle] = useState('');
  const [yourRole, setYourRole] = useState('');
  const [otherRole, setOtherRole] = useState('');
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [conversationLog, setConversationLog] = useState('');
  const [priority, setPriority] = useState('normal');
  const [preferredTone, setPreferredTone] = useState<Tone | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload: AnalysisRequest = {
      case_title: caseTitle,
      your_role: yourRole,
      other_party_role: otherRole,
      goal,
      context,
      conversation_log: conversationLog,
      priority,
      preferred_tone: preferredTone,
      tags,
    };
    await onSubmit(payload);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label className="text-sm space-y-2">
          <span className="text-gray-300">Case Title</span>
          <input
            type="text"
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            required
            placeholder="e.g., Board negotiation on timeline"
          />
        </label>
        <label className="text-sm space-y-2">
          <span className="text-gray-300">Your Role</span>
          <input
            type="text"
            value={yourRole}
            onChange={(e) => setYourRole(e.target.value)}
            required
            placeholder="e.g., Product Lead"
          />
        </label>
        <label className="text-sm space-y-2">
          <span className="text-gray-300">Other Party Role</span>
          <input
            type="text"
            value={otherRole}
            onChange={(e) => setOtherRole(e.target.value)}
            required
            placeholder="e.g., Procurement Officer"
          />
        </label>
        <label className="text-sm space-y-2">
          <span className="text-gray-300">Goal</span>
          <textarea
            rows={2}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            placeholder="Define the intended outcome"
          />
        </label>
        <label className="text-sm space-y-2">
          <span className="text-gray-300">Context</span>
          <textarea
            rows={3}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Additional background details"
          />
        </label>
        <label className="text-sm space-y-2">
          <span className="text-gray-300">Conversation Log</span>
          <textarea
            className="font-mono"
            rows={6}
            value={conversationLog}
            onChange={(e) => setConversationLog(e.target.value)}
            placeholder="Paste conversation transcript"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm space-y-2">
            <span className="text-gray-300">Priority</span>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="text-sm space-y-2">
            <span className="text-gray-300">Preferred Tone</span>
            <select
              value={preferredTone ?? ''}
              onChange={(e) => setPreferredTone((e.target.value || null) as Tone | null)}
            >
              {toneOptions.map((tone) => (
                <option key={tone ?? 'auto'} value={tone ?? ''}>
                  {tone ? tone.replace('_', ' ') : 'Auto'}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="text-sm space-y-2">
          <span className="text-gray-300">Tags</span>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Comma separated e.g., budget, timeline"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-indigo/70 via-accent-cyan/60 to-accent-emerald/60 hover:from-accent-indigo hover:to-accent-emerald text-white font-semibold border border-accent-indigo/40 shadow-soft transition-all"
      >
        {loading ? 'Analyzing…' : 'Run Analysis'}
      </button>
    </form>
  );
}
