'use client';

import { User, Phone, Mail, MapPin, FileText } from 'lucide-react';

interface CustomerInfoCardProps {
  form: { name: string; email: string; phone: string; address: string; notes: string };
}

export default function CustomerInfoCard({ form }: CustomerInfoCardProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="p-5 space-y-3 text-sm">
        <div className="flex items-center gap-2 text-[#888]"><User size={14} /> <span>الاسم:</span><span className="font-bold text-[#2d2017]">{form.name}</span></div>
        <div className="flex items-center gap-2 text-[#888]"><Mail size={14} /> <span>البريد:</span><span className="font-bold text-[#2d2017]">{form.email}</span></div>
        <div className="flex items-center gap-2 text-[#888]"><Phone size={14} /> <span>الموبايل:</span><span className="font-bold text-[#2d2017]">{form.phone}</span></div>
        <div className="flex items-center gap-2 text-[#888]"><MapPin size={14} /> <span>العنوان:</span><span className="font-bold text-[#2d2017]">{form.address}</span></div>
        {form.notes && <div className="flex items-start gap-2 text-[#888]"><FileText size={14} /> <span>ملاحظات:</span><span className="font-bold text-[#2d2017]">{form.notes}</span></div>}
      </div>
    </div>
  );
}
