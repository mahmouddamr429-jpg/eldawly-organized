'use client';

import { User, Mail, Phone } from 'lucide-react';

interface AccountDetailsProps {
  user: any;
}

export default function AccountDetails({ user }: AccountDetailsProps) {
  const fields = [
    { icon: <User size={16} />, label: 'الاسم', value: user.displayName },
    { icon: <Mail size={16} />, label: 'البريد', value: user.email },
    { icon: <Phone size={16} />, label: 'الموبايل', value: user.phone },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8] mb-6">
      <h3 className="text-lg font-extrabold text-[#2d2017] mb-4">بيانات الحساب</h3>
      {fields.map((item, i) => (
        <div key={i} className="flex items-center gap-3 py-2 border-b border-[#f0ece8] last:border-0">
          <div className="text-[#c8744a]">{item.icon}</div>
          <span className="text-sm text-[#888] w-20">{item.label}</span>
          <span className="text-sm font-bold text-[#2d2017] flex-1">{item.value || '—'}</span>
        </div>
      ))}
    </div>
  );
}
