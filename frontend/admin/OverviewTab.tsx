'use client';

import StatsCards from './StatsCards';
import CategorySales from './CategorySales';
import DailyRevenue from './DailyRevenue';
import TopProducts from './TopProducts';

interface OverviewTabProps {
  stats: any;
}

export default function OverviewTab({ stats }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <CategorySales categorySales={stats.categorySales} />
      <DailyRevenue dailyRevenue={stats.dailyRevenue} />
      <TopProducts topProducts={stats.topProducts} />
    </div>
  );
}
