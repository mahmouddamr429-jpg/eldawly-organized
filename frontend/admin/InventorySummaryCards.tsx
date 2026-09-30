'use client';

import { Package, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface InventorySummaryCardsProps {
  productCount: number;
  lowOnlyCount: number;
  outOfStockCount: number;
  availableCount: number;
}

export default function InventorySummaryCards({ productCount, lowOnlyCount, outOfStockCount, availableCount }: InventorySummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8] text-center stat-card-enter" style={{ animationDelay: '0ms' }}>
        <div className="w-11 h-11 rounded-xl bg-[#2d2017] text-white flex items-center justify-center mx-auto mb-3"><Package size={20} /></div>
        <div className="text-3xl font-black text-[#2d2017]">{productCount}</div>
        <div className="text-xs text-[#888] font-bold mt-1">إجمالي المنتجات</div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8] text-center stat-card-enter" style={{ animationDelay: '80ms' }}>
        <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-3"><AlertTriangle size={20} /></div>
        <div className="text-3xl font-black text-amber-600">{lowOnlyCount}</div>
        <div className="text-xs text-[#888] font-bold mt-1">ناقصة (حرجة)</div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8] text-center stat-card-enter" style={{ animationDelay: '160ms' }}>
        <div className="w-11 h-11 rounded-xl bg-red-500 text-white flex items-center justify-center mx-auto mb-3"><XCircle size={20} /></div>
        <div className="text-3xl font-black text-red-600">{outOfStockCount}</div>
        <div className="text-xs text-[#888] font-bold mt-1">نفذت بالكامل</div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8] text-center stat-card-enter" style={{ animationDelay: '240ms' }}>
        <div className="w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center mx-auto mb-3"><CheckCircle size={20} /></div>
        <div className="text-3xl font-black text-green-600">{availableCount}</div>
        <div className="text-xs text-[#888] font-bold mt-1">متوفرة</div>
      </div>
    </div>
  );
}
