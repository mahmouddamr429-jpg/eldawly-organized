'use client';

import { useState } from 'react';
import { User, CheckCircle, Loader2 } from 'lucide-react';
import { authApi, setUser, setToken } from '../lib/api';
import LoginField from './LoginField';

interface CustomerRegisterFormProps {
  onError: (msg: string) => void;
}

export default function CustomerRegisterForm({ onError }: CustomerRegisterFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearErr = (field: string) => {
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!displayName.trim() || displayName.trim().length < 2) errs.displayName = 'الاسم لازم حرفين على الأقل';
    if (!email.trim()) {
      errs.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'البريد مش صحيح — مثال: name@gmail.com';
    }
    if (!phone.trim()) {
      errs.phone = 'رقم الموبايل مطلوب';
    } else if (!/^01[0-9]{9}$/.test(phone.trim())) {
      errs.phone = 'رقم الموبايل لازم يبدأ بـ 01 و يكون 11 رقم';
    }
    if (!custPassword.trim()) {
      errs.custPassword = 'كلمة السر مطلوبة';
    } else if (custPassword.length < 8) {
      errs.custPassword = 'كلمة السر لازم 8 حروف على الأقل';
    }
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setLoading(true);
    try {
      const data = await authApi.register({ username: displayName, password: custPassword, displayName, email, phone });
      if (!data.success) { onError(data.error || 'خطأ في التسجيل — ممكن البريد أو الرقم مسجل قبل كده'); setLoading(false); return; }
      if (!data.user || !data.token) { onError('خطأ في الاستجابة — الرجاء المحاولة مرة أخرى'); setLoading(false); return; }

      setUser({
        id: data.user.id,
        displayName: data.user.displayName,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
        totalSpent: data.user.totalSpent,
        loyaltyGift: data.user.loyaltyGift,
      });
      setToken(data.token);
      window.location.href = '/menu';
    } catch (e: any) {
      onError(e.message || 'خطأ في الشبكة — حاول تاني');
    }
    setLoading(false);
  };

  const handleGuest = () => {
    setToken(null);
    setUser({
      id: 'guest',
      role: 'guest',
      displayName: 'زائر',
      email: '',
    });
    window.location.href = '/menu';
  };

  return (
    <div className="space-y-3">
      <div className="bg-[#fdf9f5] border border-[#e8ddd2] rounded-xl p-3 text-sm text-[#666]">
        سجل حساب وهتسجل طلباتك ولو وصلت <strong className="text-[#c8744a]">500 ج</strong> هدية من المحل! 🎁
      </div>

      <LoginField
        label="الاسم *"
        value={displayName}
        onChange={v => { setDisplayName(v); clearErr('displayName'); }}
        placeholder="اسمك"
        error={fieldErrors.displayName}
      />

      <LoginField
        label="البريد الإلكتروني *"
        type="email"
        value={email}
        onChange={v => { setEmail(v); clearErr('email'); }}
        placeholder="name@gmail.com"
        dir="ltr"
        error={fieldErrors.email}
      />

      <LoginField
        label="رقم الموبايل *"
        type="tel"
        value={phone}
        onChange={v => { setPhone(v); clearErr('phone'); }}
        placeholder="01xxxxxxxxx"
        dir="ltr"
        error={fieldErrors.phone}
        filter={v => v.replace(/[^0-9+]/g, '').slice(0, 13)}
      />

      <LoginField
        label="كلمة السر *"
        value={custPassword}
        onChange={v => { setCustPassword(v); clearErr('custPassword'); }}
        placeholder="كلمة سر — 8 حروف على الأقل"
        error={fieldErrors.custPassword}
        showToggle
        visible={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
      />

      <button onClick={handleSubmit} disabled={loading}
        className="w-full py-3 rounded-full font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: '#c8744a' }}>
        {loading ? <><Loader2 size={16} className="animate-spin" /> جاري التسجيل...</> : <><CheckCircle size={16} /> تسجيل حساب</>}
      </button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e8ddd2]" /></div>
        <div className="relative flex justify-center"><span className="bg-white/90 px-3 text-sm text-[#aaa]">أو</span></div>
      </div>

      <button onClick={handleGuest}
        className="w-full py-3 rounded-full font-bold text-[#c8744a] border-2 border-[#c8744a] hover:bg-[#f5e6de] flex items-center justify-center gap-2 transition-all">
        <User size={16} /> دخول كـ زائر
      </button>
    </div>
  );
}
