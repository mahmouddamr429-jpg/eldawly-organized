'use client';

import { Search, Loader2 } from 'lucide-react';

interface OrderSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function OrderSearchBar({ searchQuery, onSearchChange, onSearch, loading }: OrderSearchBarProps) {
  return (
    <div className="flex gap-2 mb-8">
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          placeholder="رقم الموبايل أو رقم الطلب..."
          className="w-full border-2 border-[#e8ddd2] rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-[#c8744a] pr-10"
        />
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#aaa]" />
      </div>
      <button
        onClick={onSearch}
        disabled={loading}
        className="px-6 py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60 flex items-center gap-2"
        style={{ background: '#c8744a' }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        بحث
      </button>
    </div>
  );
}
