'use client';

import { StatusBadge } from '../shared/ui/index';

interface OrderDetailsModalProps {
  order: any;
  onClose: () => void;
}

const fmt = (n: number) => (n ?? 0).toFixed(0);

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[3000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="modal-pop-in bg-white rounded-[20px] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-[#f0ece8] flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#2d2017]">تفاصيل الطلب #{order.id}</h2>
          <button onClick={onClose} className="text-[#aaa] hover:text-[#2d2017] text-xl">&times;</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-[#888]">العميل:</span><p className="font-bold">{order.customerName}</p></div>
            <div><span className="text-[#888]">الموبايل:</span><p className="font-bold">{order.customerPhone || '—'}</p></div>
            <div><span className="text-[#888]">العنوان:</span><p className="font-bold">{order.address || '—'}</p></div>
            <div><span className="text-[#888]">البريد:</span><p className="font-bold" dir="ltr">{order.customerEmail || '—'}</p></div>
          </div>
          <div className="border-t border-[#f0ece8] pt-3">
            <h3 className="font-bold text-sm text-[#2d2017] mb-2">المنتجات:</h3>
            <div className="space-y-2">
              {(() => {
                try {
                  const items = JSON.parse(order.items);
                  return items.map((it: any, i: number) => (
                    <div key={i} className="flex justify-between bg-[#fdf9f5] rounded-lg px-3 py-2 text-sm">
                      <span className="font-bold">{it.name} ×{it.qty}</span>
                      <span className="font-extrabold text-[#c8744a]">{it.price * it.qty} ج</span>
                    </div>
                  ));
                } catch {
                  return <p className="text-[#888]">مفيش تفاصيل</p>;
                }
              })()}
            </div>
          </div>
          <div className="border-t border-[#f0ece8] pt-3 flex justify-between text-lg font-extrabold">
            <span>الإجمالي</span>
            <span className="text-[#c8744a]">{fmt(order.total)} ج</span>
          </div>
          {order.notes && (
            <div className="bg-[#fdf9f5] rounded-xl p-3 text-sm">
              <span className="text-[#888]">ملاحظات:</span> <span className="font-bold">{order.notes}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#888]">الحالة:</span>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
