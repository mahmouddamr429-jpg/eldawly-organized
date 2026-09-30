'use client';

import { CreditCard } from 'lucide-react';

interface OrderSummaryProps {
  cartTotal: number;
  deliveryFree: boolean;
  finalTotal: number;
}

export default function OrderSummary({ cartTotal, deliveryFree, finalTotal }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="p-5 border-b border-[#f0ece8]">
        <h3 className="font-extrabold text-[#2d2017] flex items-center gap-2"><CreditCard size={18} className="text-[#c8744a]" /> ملخص</h3>
      </div>
      <div className="p-5 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-[#888]">المجموع الفرعي</span><span className="font-bold">{cartTotal} ج</span></div>
        <div className="flex justify-between"><span className="text-[#888]">التوصيل</span><span className={`font-bold ${deliveryFree ? 'text-green-600' : ''}`}>{deliveryFree ? 'مجاني' : '15 ج'}</span></div>
        <div className="flex justify-between text-lg font-extrabold pt-3 border-t border-[#f0ece8]"><span>الإجمالي</span><span className="text-[#c8744a]">{finalTotal} ج</span></div>
      </div>
    </div>
  );
}
