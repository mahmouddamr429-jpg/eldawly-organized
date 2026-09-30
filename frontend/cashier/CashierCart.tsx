'use client';

interface CashierCartProps {
  cart: any[];
  cartTotal: number;
  updateQty: (id: number, d: number) => void;
  removeFromCart: (id: number) => void;
  customerName: string;
  setCustomerName: (v: string) => void;
  amountPaid: string;
  setAmountPaid: (v: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}

export default function CashierCart({ cart, cartTotal, updateQty, removeFromCart, customerName, setCustomerName, amountPaid, setAmountPaid, onSubmit, submitting }: CashierCartProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#f0ece8] shadow-md p-5 h-fit sticky top-4">
      <h3 className="font-extrabold text-[#2d2017] mb-3 flex items-center gap-2">
        <span className="text-lg">🛒</span> السلة
      </h3>
      {cart.length === 0 ? (
        <p className="text-[#aaa] text-sm text-center py-6">اضغط على منتج</p>
      ) : (
        <>
          <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-[#fdf9f5] rounded-lg px-3 py-2 text-sm">
                <div className="flex-1 min-w-0"><p className="font-bold text-[#2d2017] truncate">{item.name}</p></div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-[#f0ece8] text-[#2d2017] flex items-center justify-center text-xs font-bold hover:bg-[#e8ddd2]">-</button>
                  <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-[#c8744a] text-white flex items-center justify-center text-xs font-bold hover:bg-[#a85a36]">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-xs mr-1">✕</button>
                </div>
                <span className="text-xs font-extrabold text-[#c8744a] mr-2">{item.price * item.qty} ج</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e8ddd2] pt-3 mb-3">
            <div className="flex justify-between text-lg font-extrabold text-[#2d2017]">
              <span>الإجمالي</span><span className="text-[#c8744a]">{cartTotal} ج</span>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div>
              <label className="block font-bold text-sm text-[#2d2017] mb-1">اسم العميل *</label>
              <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
                placeholder="اسم العميل" className="w-full border-2 border-[#e8ddd2] rounded-xl px-4 py-2.5 text-sm bg-[#fdf9f5] outline-none focus:border-[#c8744a]" />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#2d2017] mb-1">المبلغ المدفوع</label>
              <input type="number" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} dir="ltr"
                placeholder="0" className="w-full border-2 border-[#e8ddd2] rounded-xl px-4 py-2.5 text-sm bg-[#fdf9f5] outline-none focus:border-[#c8744a]" />
            </div>
          </div>
          <button onClick={onSubmit} disabled={submitting || !customerName.trim() || cart.length === 0}
            className="w-full py-3 rounded-full font-bold text-white text-sm hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            style={{ background: '#c8744a' }}>
            {submitting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري التسجيل...</> : '🍽️ تسجيل الطلب'}
          </button>
        </>
      )}
    </div>
  );
}
