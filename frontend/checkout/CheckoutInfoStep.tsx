'use client';

import { MapPin, FileText, Truck, ArrowLeft } from 'lucide-react';
import LoginField from '../login/LoginField';

interface CheckoutInfoStepProps {
  form: { name: string; email: string; phone: string; address: string; notes: string };
  errors: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onContinue: () => void;
  deliveryFree: boolean;
}

export default function CheckoutInfoStep({ form, errors, onChange, onContinue, deliveryFree }: CheckoutInfoStepProps) {
  return (
    <div className="checkout-step-in">
      <div className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-6 border-b border-[#f0ece8]">
          <h1 className="text-2xl font-extrabold text-[#2d2017] flex items-center gap-2">
            <MapPin size={24} className="text-[#c8744a]" /> بيانات التوصيل
          </h1>
          <p className="text-sm text-[#888] mt-1">املا البيانات عشان نوصل طلبك</p>
        </div>
        <div className="p-6 space-y-4">
          <LoginField label="الاسم الكامل *" value={form.name} onChange={v => onChange('name', v)} placeholder="اسمك الكامل" error={errors.name} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LoginField label="البريد الإلكتروني *" type="email" value={form.email} onChange={v => onChange('email', v)} placeholder="name@gmail.com" dir="ltr" error={errors.email} />
            <LoginField label="رقم الموبايل *" type="tel" value={form.phone} onChange={v => onChange('phone', v)} placeholder="01xxxxxxxxx" dir="ltr" error={errors.phone} filter={v => v.replace(/[^0-9+]/g, '').slice(0, 13)} />
          </div>
          <LoginField label="عنوان التوصيل *" value={form.address} onChange={v => onChange('address', v)} placeholder="العنوان بالتفصيل" error={errors.address} />
          <div>
            <label className="block font-bold text-sm text-[#2d2017] mb-1.5"><FileText size={14} className="inline ml-1" /> ملاحظات (اختياري)</label>
            <textarea value={form.notes} onChange={e => onChange('notes', e.target.value)} className="w-full border-2 border-[#e8ddd2] rounded-xl px-4 py-3 text-sm bg-[#fdf9f5] outline-none focus:border-[#c8744a] focus:bg-white resize-none transition-all duration-200" rows={2} placeholder="ملاحظات زيادة — مثلاً: من غير سكر" />
          </div>
        </div>
        <div className="p-6 border-t border-[#f0ece8] bg-[#fdf9f5]">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white border border-[#f0ece8]">
            <Truck size={20} className="text-[#c8744a]" />
            <div className="flex-1">
              <p className="text-sm font-bold text-[#2d2017]">تكلفة التوصيل</p>
              <p className="text-xs text-[#888]">{deliveryFree ? 'توصيل مجاني — طلبك فوق ١٠٠ ج! 🎉' : '١٥ جنيه — توصيل مجاني فوق ١٠٠ ج'}</p>
            </div>
            <span className={`text-sm font-extrabold ${deliveryFree ? 'text-green-600' : 'text-[#c8744a]'}`}>{deliveryFree ? 'مجاني' : '15 ج'}</span>
          </div>
          <button onClick={onContinue}
            className="w-full py-3.5 rounded-full font-bold text-white hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 transition-all"
            style={{ background: '#c8744a' }}>
            مراجعة الطلب <ArrowLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
