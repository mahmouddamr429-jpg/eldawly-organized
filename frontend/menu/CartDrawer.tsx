'use client';

import { ShoppingBag, X } from 'lucide-react';
import { CartItemRow } from '../shared/ui/index';

interface CartDrawerProps {
  open: boolean;
  cart: any[];
  cartTotal: number;
  onUpdateQty: (id: number, d: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export default function CartDrawer({ open, cart, cartTotal, onUpdateQty, onRemove, onCheckout, onClose }: CartDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex justify-start" onClick={onClose}>
      <div className="cart-slide-in bg-white w-full max-w-sm h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-[#e8ddd2] flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg font-extrabold text-[#2d2017] flex items-center gap-2"><ShoppingBag size={20} /> السلة</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-[#f5e6de] flex items-center justify-center"><X size={18} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="p-8 text-center text-[#aaa]"><div className="text-4xl mb-3">🛒</div><p>السلة فاضية</p></div>
        ) : (
          <>
            <div className="p-4 space-y-3">
              {cart.map(item => <CartItemRow key={item.id} item={item} onUpdateQty={onUpdateQty} onRemove={onRemove} />)}
            </div>
            <div className="p-4 border-t border-[#e8ddd2] sticky bottom-0 bg-white">
              <div className="flex justify-between text-xl font-extrabold text-[#2d2017] mb-4">
                <span>الإجمالي</span><span className="text-[#c8744a]">{cartTotal} ج</span>
              </div>
              <button onClick={onCheckout}
                className="w-full py-3.5 rounded-full font-bold text-white hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                style={{ background: '#c8744a' }}>
                إتمام الطلب
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
