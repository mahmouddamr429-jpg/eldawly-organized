'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { getEmoji } from '@/lib/constants';

interface CartItemRowProps { item: { id: number; name: string; price: number; image: string; qty: number; stock?: number }; onUpdateQty: (id: number, d: number) => void; onRemove: (id: number) => void; size?: 'sm' | 'md'; }

export default function CartItemRow({ item, onUpdateQty, onRemove, size = 'md' }: CartItemRowProps) {
  const sm = size === 'sm';
  return (
    <div className={`flex items-center gap-2 bg-[#fdf9f5] rounded-xl px-3 py-2`}>
      <span className={sm ? 'text-xl' : 'text-2xl'}>{getEmoji(item.image)}</span>
      <div className="flex-1 min-w-0">
        <div className={`${sm ? 'text-xs' : 'text-sm'} font-bold text-[#2d2017] truncate`}>{item.name}</div>
        <div className="text-[#c8744a] font-bold text-xs">{item.price * item.qty} ج</div>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => onUpdateQty(item.id, -1)} className={`${sm ? 'w-6 h-6' : 'w-7 h-7'} rounded-full border border-[#e8ddd2] flex items-center justify-center`}><Minus size={sm ? 10 : 12} /></button>
        <span className={`${sm ? 'text-xs w-4' : 'text-sm w-5'} font-bold text-center`}>{item.qty}</span>
        <button onClick={() => onUpdateQty(item.id, 1)} disabled={Number.isFinite(Number(item.stock)) && item.qty >= Number(item.stock)} aria-label={item.qty >= Number(item.stock) ? 'الكمية المتاحة انتهت' : 'زيادة الكمية'} title={item.qty >= Number(item.stock) ? 'الكمية المتاحة انتهت' : 'زيادة الكمية'} className={`${sm ? 'w-6 h-6' : 'w-7 h-7'} rounded-full border border-[#e8ddd2] flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-40`}><Plus size={sm ? 10 : 12} /></button>
        <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 mr-1"><Trash2 size={sm ? 12 : 14} /></button>
      </div>
    </div>
  );
}
