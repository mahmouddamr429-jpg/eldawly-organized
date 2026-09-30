'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/Navbar';
import { Toast, Footer } from '../shared/ui/index';
import { orderApi, getUser, setUser } from '../lib/api';
import { useCart } from '../hooks/useCart';
import StepIndicator from './StepIndicator';
import CheckoutInfoStep from './CheckoutInfoStep';
import CheckoutReviewStep from './CheckoutReviewStep';
import CheckoutSuccessStep from './CheckoutSuccessStep';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, setCart, cartTotal, cartCount, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState('');
  const [placing, setPlacing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

  useEffect(() => { try { const s = localStorage.getItem('eldawly_cart'); if (s) setCart(JSON.parse(s)); } catch {} }, []);
  useEffect(() => {
    const u = getUser();
    if (u) setForm(prev => ({ ...prev, name: u?.displayName || prev.name, email: u?.email || prev.email, phone: u?.phone || prev.phone }));
  }, []);

  const showToast = (msg: string, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
  const onChange = (key: string, value: string) => { setForm(prev => ({ ...prev, [key]: value })); if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' })); };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'الاسم لازم حرفين على الأقل';
    if (!form.email.trim()) errs.email = 'البريد الإلكتروني مطلوب';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'البريد مش صحيح';
    if (!form.phone.trim()) errs.phone = 'رقم الموبايل مطلوب';
    else if (!/^01[0-9]{9}$/.test(form.phone.trim())) errs.phone = 'رقم الموبايل لازم يبدأ بـ 01 و يكون 11 رقم';
    if (!form.address.trim() || form.address.trim().length < 3) errs.address = 'العنوان مطلوب';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const u = getUser();
      const d = await orderApi.create({ customerName: form.name, customerEmail: form.email, customerPhone: form.phone, address: form.address, notes: form.notes, items: cart, total: cartTotal, userId: u?.id });
      if (d.success) {
        setOrderId(d.orderId); setStep(3); clearCart(); localStorage.removeItem('eldawly_cart');
        if (u?.id) {
          try {
            const sd = await orderApi.updateSpend(u.id, cartTotal);
            if (sd.success) { setUser({ ...u, totalSpent: sd.totalSpent, loyaltyGift: sd.loyaltyGift }); if (sd.justEarnedGift) showToast('مبروك! هدية من المحل! 🎁'); }
          } catch {}
        }
      } else { showToast(d.error || 'حدث خطأ في تسجيل الطلب', 'warn'); }
    } catch (e: any) { showToast(e.message || 'حدث خطأ — حاول تاني', 'warn'); }
    setPlacing(false);
  };

  const deliveryFree = cartTotal >= 100;
  const finalTotal = cartTotal + (deliveryFree ? 0 : 15);

  return (
    <div className="page-enter min-h-screen bg-[#fdf9f5]" style={{ direction: 'rtl' }}>
      <Navbar cartCount={cartCount} />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#c8744a]/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#c8744a]/3 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8" style={{ marginTop: 'var(--nav-h, 70px)' }}>
        <StepIndicator step={step} />
        {step === 1 && <CheckoutInfoStep form={form} errors={errors} onChange={onChange} onContinue={() => validate() && setStep(2)} deliveryFree={deliveryFree} />}
        {step === 2 && <CheckoutReviewStep cart={cart} form={form} cartTotal={cartTotal} deliveryFree={deliveryFree} finalTotal={finalTotal} placing={placing} onBack={() => setStep(1)} onPlace={placeOrder} />}
        {step === 3 && <CheckoutSuccessStep orderId={orderId} phone={form.phone} onMenu={() => router.push('/menu')} onOrders={() => router.push('/orders')} />}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type as 'ok' | 'warn'} onClose={() => setToast(null)} />}
      <Footer />
    </div>
  );
}
