'use client';

import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const IC = 'w-full border-2 border-[#e8ddd2] rounded-xl px-4 py-2.5 text-sm bg-[#fdf9f5] outline-none focus:border-[#c8744a] focus:bg-white transition-all duration-200';
const IC_ERR = 'w-full border-2 border-red-300 rounded-xl px-4 py-2.5 text-sm bg-red-50/50 outline-none focus:border-red-500 focus:bg-white transition-all duration-200';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'الاسم مطلوب';
    if (!form.email.trim()) errs.email = 'البريد مطلوب';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'البريد مش صحيح';
    if (!form.message.trim()) errs.message = 'الرسالة مطلوبة';
    if (form.phone.trim() && !/^01[0-9]{9}$/.test(form.phone.trim())) errs.phone = 'رقم الموبايل مش صحيح';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8]">
        <div className="text-center py-12">
          <div className="success-pop text-5xl mb-4">✅</div>
          <h3 className="text-xl font-extrabold text-[#2d2017] mb-2">تم إرسال رسالتك!</h3>
          <p className="text-[#888] mb-6">هنرد عليك قريباً</p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
            className="px-6 py-2.5 rounded-full font-bold text-[#c8744a] border-2 border-[#c8744a] hover:bg-[#f5e6de]"
          >
            إرسال تانية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-extrabold text-[#2d2017] mb-2">ابعت لنا رسالة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-sm text-[#2d2017] mb-1">الاسم *</label>
            <input type="text" value={form.name} onChange={set('name')} className={errors.name ? IC_ERR : IC} placeholder="اسمك" />
            {errors.name && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
          </div>
          <div>
            <label className="block font-bold text-sm text-[#2d2017] mb-1">البريد *</label>
            <input type="email" value={form.email} onChange={set('email')} className={errors.email ? IC_ERR : IC} dir="ltr" placeholder="name@gmail.com" />
            {errors.email && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-sm text-[#2d2017] mb-1">الموبايل</label>
            <input type="tel" value={form.phone} onChange={set('phone')} className={errors.phone ? IC_ERR : IC} dir="ltr" placeholder="01xxxxxxxxx" />
            {errors.phone && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
          </div>
          <div>
            <label className="block font-bold text-sm text-[#2d2017] mb-1">الموضوع</label>
            <input type="text" value={form.subject} onChange={set('subject')} className={IC} />
          </div>
        </div>
        <div>
          <label className="block font-bold text-sm text-[#2d2017] mb-1">الرسالة *</label>
          <textarea value={form.message} onChange={set('message')} className={`${errors.message ? IC_ERR : IC} resize-none`} rows={5} placeholder="اكتب رسالتك..." />
          {errors.message && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full font-bold text-white hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          style={{ background: '#c8744a' }}
        >
          <Send size={16} /> إرسال الرسالة
        </button>
      </form>
    </div>
  );
}
