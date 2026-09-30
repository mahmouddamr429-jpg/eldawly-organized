'use client';

import { ShoppingBag, CheckCircle } from 'lucide-react';
import CartItemsList from './CartItemsList';
import OrderSummary from './OrderSummary';
import CustomerInfoCard from './CustomerInfoCard';

interface CheckoutReviewStepProps {
  cart: any[];
  form: { name: string; email: string; phone: string; address: string; notes: string };
  cartTotal: number;
  deliveryFree: boolean;
  finalTotal: number;
  placing: boolean;
  onBack: () => void;
  onPlace: () => void;
}

export default function CheckoutReviewStep({ cart, form, cartTotal, deliveryFree, finalTotal, placing, onBack, onPlace }: CheckoutReviewStepProps) {
  return (
    <div className="checkout-step-in">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-6 border-b border-[#f0ece8]">
            <h2 className="text-xl font-extrabold text-[#2d2017] flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#c8744a]" /> مراجعة الطلب
            </h2>
          </div>
          <CartItemsList cart={cart} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <OrderSummary cartTotal={cartTotal} deliveryFree={deliveryFree} finalTotal={finalTotal} />
          <CustomerInfoCard form={form} />
          <div className="flex gap-3">
            <button onClick={onBack} className="flex-1 py-3 rounded-full font-bold text-[#888] border-2 border-[#e8ddd2] hover:bg-[#f5e6de] transition-all">رجوع</button>
            <button onClick={onPlace} disabled={placing}
              className="flex-[2] py-3.5 rounded-full font-bold text-white hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
              style={{ background: '#c8744a' }}>
              {placing ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري التسجيل...</> : <><CheckCircle size={16} /> تأكيد الطلب</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
