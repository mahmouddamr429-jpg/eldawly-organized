'use client';

import { getEmoji } from '@/lib/constants';

interface CartItemsListProps {
  cart: any[];
}

export default function CartItemsList({ cart }: CartItemsListProps) {
  return (
    <div className="p-4 space-y-3">
      {cart.map(item => (
        <div key={item.id} className="flex items-center gap-3 bg-[#fdf9f5] rounded-xl px-4 py-3 border border-[#f0ece8]">
          <span className="text-2xl">{getEmoji(item.image)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#2d2017] truncate">{item.name}</p>
            <p className="text-xs text-[#888]">{item.price} ج × {item.qty}</p>
          </div>
          <span className="text-sm font-extrabold text-[#c8744a]">{item.price * item.qty} ج</span>
        </div>
      ))}
    </div>
  );
}
