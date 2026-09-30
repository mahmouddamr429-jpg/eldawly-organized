'use client';

import { CheckCircle } from 'lucide-react';
import { DataTable } from '../shared/ui/index';

interface LowStockTableProps {
  lowStock: any[];
}

const fmt = (n: number) => (n ?? 0).toFixed(0);

export default function LowStockTable({ lowStock }: LowStockTableProps) {
  if (lowStock.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#f0ece8] p-8 text-center">
        <CheckCircle size={40} className="mx-auto mb-3 text-green-500" />
        <p className="text-green-600 font-bold">كل المنتجات متوفرة ✅</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#f0ece8] overflow-hidden">
      <DataTable headers={['المنتج', 'القسم', 'المخزون', 'السعر', 'الحالة']}
        rows={lowStock.map((p: any) => ([
          <span key="name" className="font-bold text-[#2d2017]">{p.name}</span>,
          <span key="cat" className="text-[#888] text-xs">{p.category}</span>,
          <span key="stock" className="font-bold">{p.stock}</span>,
          <span key="price" className="text-[#c8744a] font-bold">{fmt(p.price)} ج</span>,
          <span key="badge" className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            p.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
          }`}>
            {p.stock === 0 ? 'نفذ ❌' : 'حرج ⚠️'}
          </span>,
        ]))} />
    </div>
  );
}
