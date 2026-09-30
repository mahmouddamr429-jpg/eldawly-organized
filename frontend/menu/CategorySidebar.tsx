'use client';

import { getEmoji } from '../lib/constants';

interface CategorySidebarProps {
  categories: string[];
  currentCat: string;
  onChange: (cat: string) => void;
  productCount: (cat: string) => number;
}

export default function CategorySidebar({ categories, currentCat, onChange, productCount }: CategorySidebarProps) {
  const sortedCats = [...categories].sort((a, b) => {
    if (a === 'الكل') return -1;
    if (b === 'الكل') return 1;
    return a.localeCompare(b);
  });

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-[calc(var(--nav-h,70px)+48px)]">
        <div className="bg-white rounded-2xl border border-[#f0ece8] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#f0ece8]">
            <h3 className="text-sm font-extrabold text-[#2d2017]">الأقسام</h3>
          </div>
          <div className="p-2 space-y-1">
            {sortedCats.map(cat => (
              <button key={cat} onClick={() => onChange(cat)}
                className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                  currentCat === cat
                    ? 'bg-[#c8744a] text-white shadow-sm shadow-[#c8744a]/20'
                    : 'text-[#666] hover:bg-[#fdf9f5] hover:text-[#c8744a]'
                }`}>
                <span className="text-base">{getEmoji(cat)}</span>
                <span className="flex-1">{cat}</span>
                {currentCat === cat && (
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">{productCount(cat)}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-br from-[#c8744a] to-[#a85a36] rounded-2xl p-4 text-white text-center shadow-md shadow-[#c8744a]/15">
          <span className="text-3xl block mb-2">🚚</span>
          <p className="text-xs font-bold leading-relaxed">توصيل مجاني<br />فوق ١٠٠ جنيه</p>
        </div>
      </div>
    </aside>
  );
}
