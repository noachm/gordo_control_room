import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function SectionCard({ title, subtitle, children }: Props) {
  return (
    <section className="bg-surface/80 border border-gray-800 rounded-2xl shadow-soft p-5 space-y-3">
      <header className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </header>
      <div className="text-sm leading-relaxed text-gray-200">{children}</div>
    </section>
  );
}
