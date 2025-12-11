import { useState } from 'react';
import TagPill from './TagPill';

interface Props {
  replies: {
    diplomat: string[];
    operator: string[];
    cold_steel: string[];
  };
}

const tabs = [
  { key: 'diplomat', label: 'Diplomat', tone: 'indigo' as const },
  { key: 'operator', label: 'Operator', tone: 'emerald' as const },
  { key: 'cold_steel', label: 'Cold Steel', tone: 'cyan' as const },
];

type TabKey = 'diplomat' | 'operator' | 'cold_steel';

export default function ToneTabs({ replies }: Props) {
  const [active, setActive] = useState<TabKey>('diplomat');

  const list = replies[active] ?? [];

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`px-3 py-2 rounded-xl text-sm border transition-colors flex items-center gap-2 ${
              active === tab.key
                ? 'bg-panel border-accent-indigo/40 text-white shadow-soft'
                : 'bg-surface border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <TagPill label={tab.label} tone={tab.tone} />
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {list.length === 0 && (
          <p className="text-gray-500 text-sm">No replies for this tone.</p>
        )}
        {list.map((reply, idx) => (
          <div
            key={`${active}-${idx}`}
            className="group relative bg-panel border border-gray-800 rounded-xl p-4 font-mono text-sm text-gray-100"
          >
            <pre className="whitespace-pre-wrap leading-6">{reply}</pre>
            <button
              type="button"
              onClick={() => copyText(reply)}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded-md bg-surface border border-gray-700 text-gray-300 hover:text-white"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
