'use client';

import { RefreshCw } from 'lucide-react';

export default function LoadingSpinner({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center py-20">
      <RefreshCw size={size} className="animate-spin text-[#c8744a]" />
    </div>
  );
}
