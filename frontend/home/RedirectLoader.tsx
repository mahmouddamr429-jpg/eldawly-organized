'use client';

export default function RedirectLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf9f5] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#c8744a]/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>
      <div className="text-center relative z-10">
        <span className="text-5xl block mb-4 float-bounce">🍮</span>
        <p className="text-[#888] font-bold">جاري التحويل...</p>
      </div>
    </div>
  );
}
