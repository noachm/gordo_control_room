interface Props {
  label: string;
  tone?: 'indigo' | 'emerald' | 'cyan' | 'rose';
}

export default function TagPill({ label, tone = 'indigo' }: Props) {
  const palette: Record<string, string> = {
    indigo: 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/40',
    emerald: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/40',
    cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/40',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-400/40',
  };
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border ${palette[tone]} font-medium tracking-wide inline-flex items-center gap-1`}
    >
      {label}
    </span>
  );
}
