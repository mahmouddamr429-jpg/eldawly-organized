'use client';

import { Leaf, Phone, Star, Heart } from 'lucide-react';

const features = [
  { icon: <Leaf size={22} />, title: 'مكونات طبيعية', desc: 'سمن بلدي وقشطة طازجة بدون مواد حافظة' },
  { icon: <Phone size={22} />, title: 'توصيل سريع', desc: 'اتصل 01000905623 والتوصيل على طول' },
  { icon: <Star size={22} />, title: 'وصفات أصيلة', desc: 'وصفات مصرية تقليدية بأحلى مذاق' },
  { icon: <Heart size={22} />, title: 'صنع بحب', desc: 'كل قطعة بتتعمل بعناية واهتمام' },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-[#2d2017]" style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>
            الحلويات أحلى لما تكون <span className="gradient-text">طازجة</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#f0ece8] hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="mx-auto mb-3 rounded-full flex items-center justify-center w-14 h-14 bg-[#f5e6de] text-[#c8744a] text-xl">{f.icon}</div>
              <h5 className="font-bold text-[#2d2017] mb-2">{f.title}</h5>
              <p className="text-sm text-[#888]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
