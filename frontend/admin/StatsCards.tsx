'use client';

import { TrendingUp, ShoppingBag, Package, BarChart3 } from 'lucide-react';
import { StatCard } from '../shared/ui/index';

interface StatsCardsProps {
  stats: any;
}

const fmt = (n: number) => (n ?? 0).toFixed(0);

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="إجمالي الدخل" value={`${fmt(stats.totalRevenue)} ج`} color="bg-[#c8744a]" icon={<TrendingUp size={20} />} index={0} />
      <StatCard label="عدد الطلبات" value={String(stats.totalOrders ?? 0)} color="bg-[#d4a843]" icon={<ShoppingBag size={20} />} index={1} />
      <StatCard label="عدد المنتجات" value={String(stats.productCount ?? 0)} color="bg-[#22c55e]" icon={<Package size={20} />} index={2} />
      <StatCard label="متوسط الطلب" value={`${fmt(stats.avgOrderValue)} ج`} color="bg-[#8b5cf6]" icon={<BarChart3 size={20} />} index={3} />
    </div>
  );
}
