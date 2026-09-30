'use client';

interface TabBarProps {
  tabs: { key: string; label: string; icon: React.ReactNode }[];
  activeTab: string;
  onChange: (key: string) => void;
}

export default function TabBar({ tabs, activeTab, onChange }: TabBarProps) {
  return (
    <div className="bg-white border-b border-[#e8ddd2] px-4">
      <div className="max-w-7xl mx-auto flex gap-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => onChange(t.key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === t.key ? 'border-[#c8744a] text-[#c8744a]' : 'border-transparent text-[#888] hover:text-[#c8744a]'
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
