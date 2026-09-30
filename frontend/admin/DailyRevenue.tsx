'use client';

import { BarChart3 } from 'lucide-react';

interface DailyRevenueProps {
  dailyRevenue: any[];
}

const fmt = (n: number) => (n ?? 0).toFixed(0);

export default function DailyRevenue({ dailyRevenue }: DailyRevenueProps) {
  if (!dailyRevenue || dailyRevenue.length === 0) return null;

  const maxRev = Math.max(...dailyRevenue.map((x: any) => x.revenue), 1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8]">
      <h2 className="text-lg font-extrabold text-[#2d2017] mb-4 flex items-center gap-2">
        <BarChart3 size={18} className="text-[#c8744a]" /> الدخل اليومي (7 أيام)
      </h2>
      <div className="flex items-end gap-3 h-48">
        {dailyRevenue.map((d: any, i: number) => {
          const heightPct = Math.max((d.revenue / maxRev) * 100, 2);
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-[#c8744a]">{fmt(d.revenue)}</span>
              <span className="text-[10px] text-[#aaa]">{d.orders} طلب</span>
              <div className="w-full bg-[#f0ece8] rounded-t-lg flex-1 flex items-end">
                <div className="w-full rounded-t-lg progress-fill transition-all duration-700"
                  style={{ height: `${heightPct}%`, background: 'linear-gradient(to top, #c8744a, #d4a843)' }} />
              </div>
              <span className="text-[10px] text-[#888]">{d.date.slice(5)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
