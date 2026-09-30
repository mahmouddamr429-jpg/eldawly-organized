'use client';

import { Search } from 'lucide-react';

interface OrderSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  statusCounts: { all: number; pending: number; completed: number; cancelled: number };
}

const filterBtns = [
  { key: 'all', label: 'الكل' },
  { key: 'pending', label: 'معلق' },
  { key: 'completed', label: 'مكتمل' },
  { key: 'cancelled', label: 'ملغي' },
];

export default function OrderSearchFilter({ search, onSearchChange, filter, onFilterChange, statusCounts }: OrderSearchFilterProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f0ece8]">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input type="text" value={search} onChange={e => onSearchChange(e.target.value)}
            placeholder="ابحث بالاسم أو رقم الطلب..."
            className="w-full border-2 border-[#e8ddd2] rounded-xl pr-9 pl-4 py-2.5 text-sm bg-[#fdf9f5] outline-none focus:border-[#c8744a]" />
        </div>
        <div className="flex gap-2">
          {filterBtns.map(f => (
            <button key={f.key} onClick={() => onFilterChange(f.key)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f.key
                  ? 'bg-[#c8744a] text-white shadow-sm'
                  : 'bg-[#fdf9f5] text-[#888] hover:bg-[#f5e6de] border border-[#e8ddd2]'
              }`}>
              {f.label} ({statusCounts[f.key as keyof typeof statusCounts]})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
