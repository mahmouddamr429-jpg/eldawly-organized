'use client';

import { RefreshCw } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  userName: string;
  userColor?: string;
  onRefresh?: () => void;
}

export default function PageHeader({ title, subtitle, userName, userColor = '#c8744a', onRefresh }: PageHeaderProps) {
  return (
    <div className="bg-[#2d2017] text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🍮</span>
        <div>
          <h1 className="text-lg font-black">{title}</h1>
          <p className="text-xs text-[#d4a843]">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {onRefresh && (
          <button onClick={onRefresh} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <RefreshCw size={16} />
          </button>
        )}
        <span className="text-sm font-bold px-3 py-1.5 rounded-full text-white" style={{ background: userColor }}>{userName}</span>
      </div>
    </div>
  );
}
