'use client';

import { Package } from 'lucide-react';

interface TopProductsProps {
  topProducts: any[];
}

const fmt = (n: number) => (n ?? 0).toFixed(0);

export default function TopProducts({ topProducts }: TopProductsProps) {
  if (!topProducts || topProducts.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8]">
      <h2 className="text-lg font-extrabold text-[#2d2017] mb-4 flex items-center gap-2">
        <Package size={18} className="text-[#c8744a]" /> أكتر منتجات اتباعت
      </h2>
      <div className="space-y-2">
        {topProducts.slice(0, 5).map((p: any, i: number) => (
          <div key={p.id} className="flex items-center gap-3 bg-[#fdf9f5] rounded-xl px-4 py-3">
            <span className="text-lg font-black text-[#c8744a]">#{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#2d2017] truncate">{p.name}</p>
              <p className="text-xs text-[#888]">{p.category || '—'}</p>
            </div>
            <div className="text-left">
              <p className="text-sm font-extrabold text-[#c8744a]">{fmt(p.revenue)} ج</p>
              <p className="text-[10px] text-[#888]">{p.qty} قطعة</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
