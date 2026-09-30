'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Clock, CheckCircle } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import { PageHeader, TabBar } from '../shared/ui/index';
import { getUser, productApi, orderApi, statsApi } from '../lib/api';
import { useCart } from '../hooks/useCart';
import NewOrderTab from './NewOrderTab';
import PendingOrdersTab from './PendingOrdersTab';
import HistoryTab from './HistoryTab';

export default function CashierDashboard() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['الكل']);
  const [activeCat, setActiveCat] = useState('الكل');
  const { cart, addToCart, updateQty, removeFromCart, cartTotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [tab, setTab] = useState('new');
  const [submitting, setSubmitting] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prevCat = useRef('الكل');

  const loadData = useCallback(async () => {
    try {
      const [prods, cats, cashierStats] = await Promise.all([productApi.getAll(), productApi.getCategories(), statsApi.getCashier()]);
      setProducts(Array.isArray(prods) ? prods : (prods?.data || []));
      setCategories(cats[0] === 'الكل' ? cats : ['الكل', ...cats]);
      setPendingOrders(cashierStats.pending || []);
      setCompletedOrders(cashierStats.completed || []);
    } catch {}
  }, []);

  useEffect(() => {
    const u = getUser();
    if (!u || (u.role !== 'cashier' && u.role !== 'admin')) { window.location.href = '/login'; return; }
    setUser(u);
    loadData();
  }, [loadData]);

  if (!user) return null;

  const handleCatChange = (cat: string) => {
    if (cat !== prevCat.current) { setAnimKey(k => k + 1); prevCat.current = cat; }
    setActiveCat(cat);
  };

  const submitOrder = async () => {
    if (!customerName.trim() || cart.length === 0) return;
    setSubmitting(true);
    try {
      const data = await orderApi.createDineIn({ customerName, items: cart, total: cartTotal, paid: parseFloat(amountPaid) || 0 });
      if (data.success) { clearCart(); setCustomerName(''); setAmountPaid(''); setTab('pending'); loadData(); }
    } catch {}
    setSubmitting(false);
  };

  const completeOrder = async (id: string) => { try { await orderApi.updateStatus(id, 'completed'); loadData(); } catch {} };

  const tabs = [
    { key: 'new', label: 'طلب جديد', icon: <Plus size={16} /> },
    { key: 'pending', label: `معلق (${pendingOrders.length})`, icon: <Clock size={16} /> },
    { key: 'history', label: 'السجل', icon: <CheckCircle size={16} /> },
  ];

  return (
    <div className="page-enter min-h-screen bg-[#fdf9f5]" style={{ direction: 'rtl' }}>
      <Navbar />
      <PageHeader title="لوحة الكاشير" subtitle="El Dawly — Cashier" userName={user.displayName} userColor="#d4a843" onRefresh={loadData} />
      <TabBar tabs={tabs} activeTab={tab} onChange={setTab} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === 'new' && (
          <NewOrderTab products={products} categories={categories} activeCat={activeCat} onCatChange={handleCatChange}
            cart={cart} cartTotal={cartTotal} addToCart={addToCart} updateQty={updateQty} removeFromCart={removeFromCart}
            clearCart={clearCart} customerName={customerName} setCustomerName={setCustomerName}
            amountPaid={amountPaid} setAmountPaid={setAmountPaid} onSubmit={submitOrder} submitting={submitting} animKey={animKey} />
        )}
        {tab === 'pending' && <PendingOrdersTab orders={pendingOrders} onComplete={completeOrder} />}
        {tab === 'history' && <HistoryTab orders={completedOrders} />}
      </div>
    </div>
  );
}
