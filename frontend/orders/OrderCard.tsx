'use client';

import { StatusBadge } from '@/shared/ui';
import { getEmoji } from '@/lib/constants';

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  const parseItems = (itemsJson: string) => {
    try { return JSON.parse(itemsJson); } catch { return []; }
  };
  const items = parseItems(order.items);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8] hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-mono text-[#888]">#{order.id}</span>
          <div className="font-extrabold text-[#2d2017]">{order.customerName}</div>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {items.map((item: any, i: number) => (
          <span key={i} className="inline-flex items-center gap-1 bg-[#f0ece8] px-2 py-1 rounded-lg text-xs">
            {getEmoji(item.image)} {item.name} ×{item.qty}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-[#f0ece8]">
        <span className="text-lg font-extrabold text-[#c8744a]">{(order.total ?? 0).toFixed(0)} ج</span>
        <span className="text-xs text-[#aaa]">{new Date(order.createdAt).toLocaleString('ar-EG')}</span>
      </div>
    </div>
  );
}
