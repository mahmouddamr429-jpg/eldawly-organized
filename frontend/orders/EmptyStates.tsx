'use client';

import { Loader2, Package } from 'lucide-react';

export function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 size={28} className="animate-spin text-[#c8744a]" />
    </div>
  );
}

export function NoResults() {
  return (
    <div className="text-center py-12 text-[#aaa]">
      <div className="text-4xl mb-3">🔍</div>
      <p className="font-bold">مفيش طلبات بالبيانات دي</p>
    </div>
  );
}

export function SearchPrompt() {
  return (
    <div className="text-center py-16 text-[#ccc]">
      <Package size={48} className="mx-auto mb-4" />
      <p className="font-bold text-[#aaa]">ابحث عن طلباتك</p>
    </div>
  );
}
