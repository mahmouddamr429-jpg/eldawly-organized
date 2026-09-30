'use client';

import { getEmoji } from '@/lib/constants';

interface CategoryBarProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryBar({ categories, active, onChange }: CategoryBarProps) {
  const sorted = [...categories].sort((a, b) => {
    if (a === 'الكل') return -1;
    if (b === 'الكل') return 1;
    return a.localeCompare(b);
  });

  return (
    <section className="bg-white border-b border-[#e8ddd2] sticky top-[var(--nav-h,70px)] z-50">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {sorted.map(cat => (
            <button key={cat} onClick={() => onChange(cat)}
              className={`cat-pill px-5 py-2 rounded-full text-sm font-bold border-2 whitespace-nowrap shrink-0 transition-all duration-200 ${
                active === cat
                  ? 'cat-pill-active bg-[#c8744a] text-white border-[#c8744a] shadow-md shadow-[#c8744a]/20'
                  : 'border-[#e8ddd2] text-[#888] hover:border-[#c8744a] hover:text-[#c8744a] hover:bg-[#fdf9f5]'
              }`}>
              {getEmoji(cat)} {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
