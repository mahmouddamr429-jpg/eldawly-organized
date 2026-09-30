'use client';

import { ReactNode } from 'react';
import { Search, X } from 'lucide-react';

interface HeroSectionProps {
  title: ReactNode;
  subtitle?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  searchPlaceholder?: string;
}

export default function HeroSection({ title, subtitle, showSearch, searchValue, onSearchChange, searchPlaceholder }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-14 animated-gradient" style={{ background: 'linear-gradient(135deg, #0d0604, #2a1508 28%, #6b3520 62%, #c8744a 100%)', backgroundSize: '200% 200%' }}>
      <div className="hero-shimmer absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 text-center">
        <h1 className="text-white font-black mb-3" style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
          {title}
        </h1>
        {subtitle && <p className="text-white/65 max-w-[520px] mx-auto">{subtitle}</p>}
        {showSearch && onSearchChange && (
          <div className="mt-6 max-w-lg mx-auto">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full px-5 py-3 transition-all focus-within:border-white/40 focus-within:bg-white/15">
              <Search size={18} className="text-white/50" />
              <input type="text" placeholder={searchPlaceholder || 'ابحث...'} className="flex-1 outline-none bg-transparent text-white placeholder:text-white/40 text-sm"
                value={searchValue} onChange={e => onSearchChange(e.target.value)} />
              {searchValue && <button onClick={() => onSearchChange('')} className="text-white/50 hover:text-white"><X size={16} /></button>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
