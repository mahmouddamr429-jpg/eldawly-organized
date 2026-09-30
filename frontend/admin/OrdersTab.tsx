'use client';

import { useState } from 'react';
import OrderSearchFilter from './OrderSearchFilter';
import OrderTable from './OrderTable';
import OrderDetailsModal from './OrderDetailsModal';

interface OrdersTabProps {
  orders: any[];
  onUpdateStatus: (id: string, status: string) => void;
  onRefresh: () => void;
}

export default function OrdersTab({ orders, onUpdateStatus, onRefresh }: OrdersTabProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filtered = orders.filter((o: any) => {
    const matchSearch = !search || o.customerName?.includes(search) || o.id?.includes(search);
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o: any) => o.status === 'pending').length,
    completed: orders.filter((o: any) => o.status === 'completed').length,
    cancelled: orders.filter((o: any) => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-4">
      <OrderSearchFilter search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} statusCounts={statusCounts} />
      <OrderTable orders={filtered} onUpdateStatus={onUpdateStatus} onViewDetails={setSelectedOrder} />
      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}
