'use client';

import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'ok' | 'warn';
  onClose: () => void;
}

export default function Toast({ message, type = 'ok', onClose }: ToastProps) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="toast-in fixed bottom-6 left-6 z-[9999] flex items-center gap-3 min-w-[260px] px-5 py-3.5 rounded-xl text-white text-sm font-semibold shadow-lg"
      style={{ background: '#1e1e1e', borderRight: `4px solid ${type === 'warn' ? '#f59e0b' : '#c8744a'}` }}>
      <CheckCircle size={18} className={type === 'warn' ? 'text-amber-400' : 'text-green-400'} />
      {message}
    </div>
  );
}
