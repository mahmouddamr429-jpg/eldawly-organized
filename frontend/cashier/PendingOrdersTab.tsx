'use client';

import { Clock, CheckCircle } from 'lucide-react';
import { StatusBadge } from '../shared/ui/index';
import { getEmoji } from '../lib/constants';

interface PendingOrdersTabProps {
  orders: any[];
  onComplete: (id: string) => void;
}

const renderItems = (itemsJson: string) => {
  try {
    const items = JSON.parse(itemsJson);
    return items.map((item: any, i: number) => (
      <span key={i} className="inline-flex items-center gap-1 bg-[#f0ece8] px-2 py-1 rounded-lg text-xs">
        {getEmoji(item.image)} {item.name} ×{item.qty}
      </span>
    ));
  } catch { return <span className="text-[#aaa] text-xs">—</span>; }
};

export default function PendingOrdersTab({ orders, onComplete }: PendingOrdersTabProps) {
  if (orders.length === 0) {
    return (
      <div>
        <h3 className="font-extrabold text-[#2d2017] mb-4 flex items-center gap-2"><Clock size={20} className="text-amber-500" /> الأوردرات المعلقة</h3>
        <div className="bg-white rounded-2xl p-12 text-center text-[#aaa]">مفيش طلبات معلقة ✅</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-extrabold text-[#2d2017] mb-4 flex items-center gap-2"><Clock size={20} className="text-amber-500" /> الأوردرات المعلقة</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(o => (
          <div key={o.id} className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-mono text-[#888]">#{o.id}</span>
                <div className="font-extrabold text-[#2d2017]">{o.customerName}</div>
              </div>
              <StatusBadge status="pending" />
            </div>
            <div className="flex flex-wrap gap-1 mb-3">{renderItems(o.items)}</div>
            <div className="flex justify-between items-center border-t border-[#e8ddd2] pt-3">
              <div className="text-lg font-extrabold text-[#c8744a]">{(o.total ?? 0).toFixed(0)} ج</div>
              <button onClick={() => onComplete(o.id)}
                className="px-4 py-2 rounded-full text-xs font-bold text-white bg-green-500 hover:bg-green-600 flex items-center gap-1">
                <CheckCircle size={14} /> تم
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
