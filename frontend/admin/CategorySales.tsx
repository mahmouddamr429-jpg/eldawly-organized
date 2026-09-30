'use client';

import { TrendingUp } from 'lucide-react';

interface CategorySalesProps {
  categorySales: Record<string, number>;
}

const fmt = (n: number) => (n ?? 0).toFixed(0);
const catColors = ['#c8744a', '#d4a843', '#22c55e', '#8b5cf6', '#06b6d4', '#f43f5e', '#f97316', '#6366f1'];

export default function CategorySales({ categorySales }: CategorySalesProps) {
  const entries = Object.entries(categorySales || {}).sort(([, a]: any, [, b]: any) => b - a);
  const total = entries.reduce((s, [, v]: any) => s + v, 0);

  if (entries.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8]">
      <h2 className="text-lg font-extrabold text-[#2d2017] mb-4 flex items-center gap-2">
        <TrendingUp size={18} className="text-[#c8744a]" /> المبيعات بالأقسام
      </h2>
      <div className="space-y-3">
        {entries.map(([cat, rev]: any, i: number) => {
          const pct = total > 0 ? (rev / total) * 100 : 0;
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold text-[#2d2017]">{cat}</span>
                <span className="font-extrabold" style={{ color: catColors[i % catColors.length] }}>{fmt(rev)} ج ({pct.toFixed(1)}%)</span>
              </div>
              <div className="w-full h-3 bg-[#f0ece8] rounded-full overflow-hidden">
                <div className="h-full rounded-full progress-fill" style={{ width: `${Math.max(pct, 2)}%`, background: catColors[i % catColors.length] }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
