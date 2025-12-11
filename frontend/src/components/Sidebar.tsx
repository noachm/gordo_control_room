import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Sidebar({ children }: Props) {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">War Room</p>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          🦂 GORDO CONTROL ROOM™
        </h1>
        <p className="text-sm text-gray-400">Conversation &amp; Power Dynamics Engine</p>
      </header>
      {children}
    </div>
  );
}
