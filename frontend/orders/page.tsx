'use client';

import { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { Footer } from '../shared/ui';
import { orderApi } from '../lib/api';
import OrderSearchBar from './OrderSearchBar';
import OrderCard from './OrderCard';
import { SearchLoading, NoResults, SearchPrompt } from './EmptyStates';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState('');

  const searchOrders = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearchError('');
    try {
      const data = await orderApi.getAll(`search=${encodeURIComponent(searchQuery.trim())}`);
      setOrders(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      setOrders([]);
      setSearchError(error instanceof Error ? error.message : 'تعذر البحث عن الطلب');
    }
    setLoading(false);
    setSearched(true);
  };

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ direction: 'rtl' }}>
      <Navbar />
      <section className="py-16 bg-[#fdf9f5] flex-1">
        <div className="max-w-[700px] mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-extrabold text-[#2d2017] mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>
              بحث عن <span className="gradient-text">طلب</span>
            </h1>
            <p className="text-[#888]">ابحث برقم الموبايل أو رقم الطلب</p>
          </div>

          <OrderSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={searchOrders} loading={loading} />

          {loading && <SearchLoading />}
          {!loading && searchError && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-center text-red-700">{searchError}</p>}
          {!loading && searched && orders.length === 0 && <NoResults />}
          {!loading && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          )}
          {!searched && !loading && <SearchPrompt />}
        </div>
      </section>
      <Footer />
    </div>
  );
}
