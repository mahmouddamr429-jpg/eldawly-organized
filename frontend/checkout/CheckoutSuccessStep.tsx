'use client';

import { ShoppingBag } from 'lucide-react';

interface CheckoutSuccessStepProps {
  orderId: string;
  phone: string;
  onMenu: () => void;
  onOrders: () => void;
}

export default function CheckoutSuccessStep({ orderId, phone, onMenu, onOrders }: CheckoutSuccessStepProps) {
  return (
    <div className="checkout-step-in">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-10">
            <div className="success-pop text-7xl mb-6">🎉</div>
            <h2 className="text-3xl font-extrabold text-[#2d2017] mb-3">تم تسجيل طلبك!</h2>
            <p className="text-[#888] mb-2">رقم الطلب:</p>
            <p className="text-3xl font-mono font-extrabold text-[#c8744a] mb-6">#{orderId}</p>

            <div className="bg-[#fdf9f5] rounded-xl p-4 mb-6 border border-[#f0ece8]">
              <p className="text-sm text-[#666] leading-relaxed">
                هنتواصل معاك على رقم <strong className="text-[#2d2017]">{phone}</strong> لتأكيد الطلب وتحديد ميعاد التوصيل
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={onMenu}
                className="flex-1 py-3.5 rounded-full font-bold text-white hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                style={{ background: '#c8744a' }}>
                <ShoppingBag size={16} /> اطلب كمان
              </button>
              <button onClick={onOrders}
                className="flex-1 py-3.5 rounded-full font-bold text-[#c8744a] border-2 border-[#c8744a] hover:bg-[#f5e6de] flex items-center justify-center gap-2 transition-all">
                طلباتي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
