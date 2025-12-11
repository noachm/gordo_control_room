import SectionCard from './SectionCard';
import TagPill from './TagPill';
import ToneTabs from './ToneTabs';
import { AnalysisResult } from '../lib/api';

interface Props {
  analysis: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

export default function AnalysisView({ analysis, loading, error }: Props) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="border border-rose-500/50 bg-rose-500/10 text-rose-100 rounded-2xl p-4 text-sm">
          {error}
        </div>
      )}

      {!analysis && !loading && !error && (
        <div className="h-full min-h-[320px] flex items-center justify-center rounded-3xl border border-dashed border-gray-700 bg-surface/60">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">Submit a case on the left to get analysis.</p>
          </div>
        </div>
      )}

      {loading && (
        <SectionCard title="Running Analysis" subtitle="Consulting the engine">
          <p className="text-gray-400 animate-pulse">Processing conversation data…</p>
        </SectionCard>
      )}

      {analysis && (
        <div className="space-y-6">
          <SectionCard
            title="Situation Summary"
            subtitle="Quick readout of the current landscape"
          >
            <p className="text-base text-gray-100 leading-relaxed">{analysis.summary}</p>
            <div className="flex flex-wrap gap-2 pt-3">
              {analysis.meta?.model_used && <TagPill label={analysis.meta.model_used} tone="cyan" />}
              {analysis.meta?.generated_at && <TagPill label={analysis.meta.generated_at} tone="emerald" />}
              {analysis.meta?.fallback && <TagPill label="Fallback" tone="rose" />}
            </div>
          </SectionCard>

          <SectionCard title="Power Map" subtitle="Frame, leverage, and positional read">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Frame Holder</p>
                <p className="text-lg text-white font-semibold">{analysis.power_dynamics.frame_holder}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Notes</p>
                <p className="text-gray-200">{analysis.power_dynamics.notes}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-panel rounded-xl p-4 border border-gray-800">
                <p className="text-xs uppercase tracking-wide text-gray-500">Your Position</p>
                <p className="text-gray-100">{analysis.power_dynamics.your_position}</p>
              </div>
              <div className="bg-panel rounded-xl p-4 border border-gray-800">
                <p className="text-xs uppercase tracking-wide text-gray-500">Other Party Position</p>
                <p className="text-gray-100">{analysis.power_dynamics.other_party_position}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Psych Profiles" subtitle="Motivations, risks, and leverage">
            <div className="grid md:grid-cols-2 gap-4">
              {(['you', 'other_party'] as const).map((side) => {
                const profile = analysis.psychology[side];
                return (
                  <div key={side} className="bg-panel border border-gray-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm uppercase tracking-wide text-gray-400">{side === 'you' ? 'You' : 'Other Party'}</h4>
                      <TagPill label={profile.style} tone={side === 'you' ? 'indigo' : 'cyan'} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Risks</p>
                      <ul className="list-disc list-inside text-gray-200 space-y-1">
                        {profile.risks.map((item, idx) => (
                          <li key={`risk-${side}-${idx}`}>{item}</li>
                        ))}
                        {profile.risks.length === 0 && <li className="text-gray-500">None listed.</li>}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Leverage</p>
                      <ul className="list-disc list-inside text-gray-200 space-y-1">
                        {profile.leverage.map((item, idx) => (
                          <li key={`lev-${side}-${idx}`}>{item}</li>
                        ))}
                        {profile.leverage.length === 0 && <li className="text-gray-500">None listed.</li>}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Strategic Options" subtitle="Paths to move the board forward">
            <div className="grid gap-3">
              {analysis.strategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className="bg-panel border border-gray-800 rounded-xl p-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base text-white font-semibold">{strategy.label}</h4>
                      <TagPill label={strategy.id} tone="indigo" />
                    </div>
                    <div className="flex gap-2">
                      <TagPill label={`Risk: ${strategy.risk_level}`} tone="rose" />
                      <TagPill label={`Reward: ${strategy.reward_profile}`} tone="emerald" />
                    </div>
                  </div>
                  <p className="text-gray-200">{strategy.description}</p>
                  <p className="text-xs text-gray-400">When to use: {strategy.when_to_use}</p>
                </div>
              ))}
              {analysis.strategies.length === 0 && (
                <p className="text-gray-500 text-sm">No strategies returned.</p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Suggested Replies" subtitle="Tone-aligned reply library">
            <ToneTabs replies={analysis.suggested_replies} />
          </SectionCard>
        </div>
      )}
    </div>
  );
}
