'use client';

import { CheckCircle } from 'lucide-react';
import { StatusBadge } from '../shared/ui/index';
import { getEmoji } from '../lib/constants';

interface HistoryTabProps {
  orders: any[];
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

export default function HistoryTab({ orders }: HistoryTabProps) {
  if (orders.length === 0) {
    return (
      <div>
        <h3 className="font-extrabold text-[#2d2017] mb-4 flex items-center gap-2"><CheckCircle size={20} className="text-green-500" /> سجل الطلبات</h3>
        <div className="bg-white rounded-2xl p-12 text-center text-[#aaa]">مفيش طلبات مكتملة لسه</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-extrabold text-[#2d2017] mb-4 flex items-center gap-2"><CheckCircle size={20} className="text-green-500" /> سجل الطلبات</h3>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o.id} className="bg-white rounded-xl p-4 border border-[#f0ece8] flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-[#888]">#{o.id}</span>
                <span className="font-bold text-[#2d2017]">{o.customerName}</span>
                <StatusBadge status="completed" />
              </div>
              <div className="flex flex-wrap gap-1">{renderItems(o.items)}</div>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-[#c8744a]">{(o.total ?? 0).toFixed(0)} ج</div>
              <div className="text-[10px] text-[#aaa]">{new Date(o.createdAt).toLocaleString('ar-EG')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
