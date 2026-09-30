'use client';

import { getEmoji } from '../lib/constants';

interface MobileCategoryBarProps {
  categories: string[];
  currentCat: string;
  onChange: (cat: string) => void;
}

export default function MobileCategoryBar({ categories, currentCat, onChange }: MobileCategoryBarProps) {
  const sortedCats = [...categories].sort((a, b) => {
    if (a === 'الكل') return -1;
    if (b === 'الكل') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="lg:hidden w-full">
      <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
        {sortedCats.map(cat => (
          <button key={cat} onClick={() => onChange(cat)}
            className={`cat-pill px-4 py-2 rounded-full text-sm font-bold border-2 whitespace-nowrap shrink-0 transition-all duration-200 ${
              currentCat === cat
                ? 'cat-pill-active bg-[#c8744a] text-white border-[#c8744a] shadow-md shadow-[#c8744a]/20'
                : 'border-[#e8ddd2] text-[#888] hover:border-[#c8744a] hover:text-[#c8744a]'
            }`}>
            {getEmoji(cat)} {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
