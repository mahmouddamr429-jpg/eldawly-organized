'use client';

import Image from 'next/image';
import { CheckCircle, Phone } from 'lucide-react';

export default function StorySection() {
  const features = ['سمن بلدي وقشطة طازجة', 'بدون مواد حافظة', 'وصفات تقليدية متوارثة', 'طلبات أفراح ومناسبات'];

  return (
    <section className="py-16 bg-[#fdf9f5]">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-5/12">
            <div className="relative">
              <div className="w-full rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/5' }}>
                <Image src="/images/about-tom-jerry.jpg" alt="حلويات الدولي" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 41%" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#c8744a] text-white rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-lg">
                <span className="text-3xl">♥</span>
                <span className="text-[10px] font-bold">مصنوع<br />بحب</span>
              </div>
            </div>
          </div>
          <div className="lg:w-7/12">
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#c8744a] mb-2">قصتنا</p>
            <h2 className="font-extrabold mb-5 text-[#2d2017]" style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>
              حلويات <span className="gradient-text">الدولي</span><br />أصالة الطعم المصري
            </h2>
            <p className="text-[#666] mb-4 leading-loose">
              حلويات الدولي — محل حلويات مصري أصيل في قلب المسله ، الفيوم. بنقدم أشهى الحلويات المصنوعة يدوياً من أفضل المكونات الطازجة.
            </p>
            <p className="text-[#666] mb-7 leading-loose">
              من الكنافة بالقشطة البلدي الطازجة لأحلى أم علي في الفيوم — كل حاجة بتتعمل بعناية وأصالة.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-[#555]">
                  <CheckCircle size={16} className="text-[#c8744a] shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
            <a href="tel:01000905623" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white hover:-translate-y-0.5 hover:shadow-lg transition-all" style={{ background: '#c8744a' }}>
              <Phone size={16} /> اتصل بنا: 01000905623
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
