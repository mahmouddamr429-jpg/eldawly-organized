'use client';

export default function CTASection() {
  return (
    <section className="py-12 bg-[#fdf9f5] flex-1">
      <div className="max-w-[600px] mx-auto px-4 text-center">
        <span className="text-5xl block mb-4">🍮</span>
        <h2 className="font-extrabold text-[#2d2017] mb-3" style={{ fontSize: 'clamp(1.6rem,4vw,2rem)' }}>
          جاهز تطلب؟
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/menu" className="px-7 py-3.5 rounded-full font-bold text-white hover:-translate-y-0.5 hover:shadow-lg transition-all" style={{ background: '#c8744a' }}>
            شوف المنيو
          </a>
          <a href="tel:01000905623" className="px-7 py-3.5 rounded-full font-bold text-[#c8744a] border-2 border-[#c8744a] hover:bg-[#f5e6de] transition-all">
            اتصل دلوقتي
          </a>
        </div>
      </div>
    </section>
  );
}
