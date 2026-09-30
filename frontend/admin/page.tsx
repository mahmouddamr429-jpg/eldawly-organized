'use client';

import { useState, useEffect, useCallback } from 'react';
import { BarChart3, ShoppingBag, Package } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import { PageHeader, TabBar, LoadingSpinner } from '../shared/ui/index';
import { getUser, statsApi, orderApi } from '../lib/api';
import OverviewTab from './OverviewTab';
import OrdersTab from './OrdersTab';
import InventoryTab from './InventoryTab';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [tab, setTab] = useState('overview');

  const loadStats = useCallback(async () => {
    try { setStats(await statsApi.getAdmin()); } catch {}
  }, []);

  useEffect(() => {
    const u = getUser();
    if (!u || u.role !== 'admin') { window.location.href = '/login'; return; }
    setUser(u);
    loadStats();
  }, [loadStats]);

  if (!user) return null;

  const tabs = [
    { key: 'overview', label: 'ملخص', icon: <BarChart3 size={16} /> },
    { key: 'orders', label: 'الطلبات', icon: <ShoppingBag size={16} /> },
    { key: 'inventory', label: 'المخزون', icon: <Package size={16} /> },
  ];

  const updateStatus = async (id: string, status: string) => {
    try { await orderApi.updateStatus(id, status); loadStats(); } catch {}
  };

  return (
    <div className="page-enter min-h-screen bg-[#fdf9f5]" style={{ direction: 'rtl' }}>
      <Navbar />
      <PageHeader title="لوحة تحكم المدير" subtitle="El Dawly — Admin" userName={user.displayName} onRefresh={loadStats} />
      <TabBar tabs={tabs} activeTab={tab} onChange={setTab} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!stats ? <LoadingSpinner /> : (
          <>
            {tab === 'overview' && <OverviewTab stats={stats} />}
            {tab === 'orders' && <OrdersTab orders={stats.recentOrders || []} onUpdateStatus={updateStatus} onRefresh={loadStats} />}
            {tab === 'inventory' && <InventoryTab productCount={stats.productCount ?? 0} lowStock={stats.lowStock || []} />}
          </>
        )}
      </div>
    </div>
  );
}
