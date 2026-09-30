'use client';

import { useState } from 'react';
import { Lock, User, Loader2 } from 'lucide-react';
import { authApi, setUser, setToken } from '../lib/api';
import LoginField from './LoginField';

interface StaffLoginFormProps {
  role: 'admin' | 'cashier';
  onError: (msg: string) => void;
}

export default function StaffLoginForm({ role, onError }: StaffLoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearErr = (field: string) => {
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!username.trim()) errs.username = 'اسم المستخدم مطلوب';
    if (!password.trim()) errs.password = 'كلمة السر مطلوبة';
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

    setFieldErrors({});
    setLoading(true);
    try {
      const data = await authApi.login(username, password);
      if (!data.success) { onError('خطأ في تسجيل الدخول — اسم المستخدم أو كلمة السر غلط'); setLoading(false); return; }
      if (!data.user || !data.token) { onError('خطأ في الاستجابة — الرجاء المحاولة مرة أخرى'); setLoading(false); return; }
      const user = data.user;

      if (role === 'admin' && user.role !== 'admin') { onError('مش حساب أدمن — حسابك دورو ' + (user.role || 'مش معروف')); setLoading(false); return; }
      if (role === 'cashier' && user.role !== 'cashier' && user.role !== 'admin') { onError('مش حساب كاشير — حسابك دورو ' + (user.role || 'مش معروف')); setLoading(false); return; }

      setUser({
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        totalSpent: user.totalSpent,
        loyaltyGift: user.loyaltyGift,
      });
      setToken(data.token);

      if (user.role === 'admin') window.location.href = '/admin';
      else if (user.role === 'cashier') window.location.href = '/cashier';
      else window.location.href = '/menu';
    } catch (e: any) {
      onError(e.message || 'خطأ في الشبكة — حاول تاني');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <LoginField
        label="اسم المستخدم *"
        value={username}
        onChange={v => { setUsername(v); clearErr('username'); }}
        placeholder={role === 'admin' ? 'admin' : 'Cashier'}
        error={fieldErrors.username}
        icon={<User size={16} />}
      />
      <LoginField
        label="كلمة السر *"
        value={password}
        onChange={v => { setPassword(v); clearErr('password'); }}
        placeholder="••••••••"
        error={fieldErrors.password}
        showToggle
        visible={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
      />
      <button onClick={handleSubmit} disabled={loading}
        className="w-full py-3.5 rounded-full font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: '#c8744a' }}>
        {loading ? <><Loader2 size={18} className="animate-spin" /> جاري الدخول...</> : <><Lock size={16} /> تسجيل الدخول</>}
      </button>
    </div>
  );
}
