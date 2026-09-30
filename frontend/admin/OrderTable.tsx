'use client';

import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { DataTable, StatusBadge } from '../shared/ui/index';

interface OrderTableProps {
  orders: any[];
  onUpdateStatus: (id: string, status: string) => void;
  onViewDetails: (order: any) => void;
}

const fmt = (n: number) => (n ?? 0).toFixed(0);

export default function OrderTable({ orders, onUpdateStatus, onViewDetails }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#f0ece8] p-8 text-center text-[#aaa]">
        <Eye size={32} className="mx-auto mb-2 opacity-30" />
        <p>مفيش طلبات</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#f0ece8] overflow-hidden">
      <DataTable headers={['رقم', 'العميل', 'النوع', 'الإجمالي', 'الحالة', 'التاريخ', 'إجراء']}
        rows={orders.map((o: any) => ([
          <span key="id" className="font-mono font-bold text-[#c8744a]">#{o.id}</span>,
          <div key="name">
            <p className="font-bold text-[#2d2017]">{o.customerName}</p>
            <p className="text-[10px] text-[#888]">{o.customerPhone || ''}</p>
          </div>,
          <span key="type" className={`px-2 py-1 rounded-full text-[10px] font-bold ${o.orderType === 'dine-in' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
            {o.orderType === 'dine-in' ? '🍽️ صالة' : '🚚 توصيل'}
          </span>,
          <span key="total" className="font-extrabold text-[#c8744a]">{fmt(o.total)} ج</span>,
          <StatusBadge key="status" status={o.status} />,
          <span key="date" className="text-[#888] text-xs whitespace-nowrap">{new Date(o.createdAt).toLocaleString('ar-EG')}</span>,
          <div key="actions" className="flex gap-1">
            <button onClick={() => onViewDetails(o)} className="px-2 py-1 rounded text-[10px] font-bold text-[#c8744a] bg-[#fdf9f5] hover:bg-[#f5e6de]">
              <Eye size={12} className="inline" /> تفاصيل
            </button>
            {o.status === 'pending' && (
              <>
                <button onClick={() => onUpdateStatus(o.id, 'completed')} className="px-2 py-1 rounded text-[10px] font-bold text-white bg-green-500 hover:bg-green-600">
                  <CheckCircle size={12} className="inline" /> تم
                </button>
                <button onClick={() => onUpdateStatus(o.id, 'cancelled')} className="px-2 py-1 rounded text-[10px] font-bold text-white bg-red-500 hover:bg-red-600">
                  <XCircle size={12} className="inline" /> إلغاء
                </button>
              </>
            )}
          </div>,
        ]))} />
    </div>
  );
}
