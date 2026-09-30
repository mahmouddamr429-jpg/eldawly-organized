'use client';

export default function LoginHero() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 animated-gradient"
      style={{ background: 'linear-gradient(135deg, #0d0604 0%, #2a1508 28%, #6b3520 62%, #c8744a 100%)', backgroundSize: '200% 200%' }}>
      <div className="hero-shimmer absolute inset-0 pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-3 h-3 bg-white/10 rounded-full top-[15%] right-[20%] animate-float-1" />
        <div className="absolute w-2 h-2 bg-white/15 rounded-full top-[40%] right-[60%] animate-float-2" />
        <div className="absolute w-4 h-4 bg-white/10 rounded-full top-[70%] right-[30%] animate-float-3" />
        <div className="absolute w-2 h-2 bg-[#d4a843]/20 rounded-full top-[25%] right-[75%] animate-float-4" />
        <div className="absolute w-3 h-3 bg-white/8 rounded-full top-[55%] right-[15%] animate-float-5" />
        <div className="absolute w-5 h-5 bg-[#c8744a]/10 rounded-full top-[80%] right-[70%] animate-float-1" />
        <div className="absolute w-2 h-2 bg-white/12 rounded-full top-[10%] right-[45%] animate-float-3" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#c8744a]/20 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-32 left-16 w-40 h-40 bg-[#d4a843]/15 rounded-full blur-xl animate-pulse-slow animation-delay-2000" />

      <div className="relative z-10 text-center max-w-lg">
        <span className="float-bounce text-7xl block mb-6">🍮</span>
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)' }}>
          حلويات <span className="gradient-text">الدولي</span>
        </h1>
        <p className="text-white/70 font-semibold text-xl mb-2">El Dawly Dessert</p>
        <p className="text-white/55 leading-loose">من قلب مسله، الفيوم — حلويات مصرية أصيلة مصنوعة يدوياً كل يوم</p>
      </div>
    </div>
  );
}
