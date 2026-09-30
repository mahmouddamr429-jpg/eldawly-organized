'use client';

import { Award, Leaf, Heart } from 'lucide-react';

const stats = [
  { num: '٥٠+', label: 'صنف', icon: <Award size={28} /> },
  { num: '١٠٠٪', label: 'طازج يومياً', icon: <Leaf size={28} /> },
  { num: 'الفيوم', label: 'مسله', icon: <Heart size={28} /> },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-[#2d2017]">
      <div className="max-w-[800px] mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-[#d4a843] mb-2 flex justify-center">{stat.icon}</div>
              <div className="gradient-text text-4xl font-black">{stat.num}</div>
              <div className="text-white/55 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
