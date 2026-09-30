'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactItems = [
  { icon: <Phone size={20} />, title: 'التليفون', value: '01000905623', href: 'tel:01000905623' },
  { icon: <MapPin size={20} />, title: 'العنوان', value: 'مسله، الفيوم' },
  { icon: <Clock size={20} />, title: 'المواعيد', value: 'كل يوم ١٠ص - ١٢م' },
  { icon: <Mail size={20} />, title: 'البريد', value: 'eldawlydessert@gmail.com', href: 'mailto:eldawlydessert@gmail.com' },
];

export default function ContactInfo() {
  return (
    <div className="lg:col-span-2 space-y-4">
      {contactItems.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8] flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#f5e6de] text-[#c8744a] flex items-center justify-center shrink-0">{item.icon}</div>
          <div>
            <div className="text-xs font-bold text-[#888] mb-0.5">{item.title}</div>
            {item.href ? (
              <a href={item.href} className="text-sm font-extrabold text-[#2d2017] hover:text-[#c8744a]">{item.value}</a>
            ) : (
              <div className="text-sm font-extrabold text-[#2d2017]">{item.value}</div>
            )}
          </div>
        </div>
      ))}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0ece8]">
        <div className="h-48 bg-[#f5e6de] flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-[#c8744a] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#2d2017]">مسله، الفيوم</p>
          </div>
        </div>
      </div>
    </div>
  );
}
