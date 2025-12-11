import { ReactNode } from 'react';

interface Props {
  sidebar: ReactNode;
  children: ReactNode;
}

export default function Layout({ sidebar, children }: Props) {
  return (
    <div className="min-h-screen bg-canvas text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-[420px,1fr] gap-6">
          <aside className="bg-surface/90 border border-gray-800 rounded-3xl shadow-soft p-6 sticky top-8 h-fit">
            {sidebar}
          </aside>
          <main className="space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
