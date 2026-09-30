'use client';

import { ShoppingBag, User, CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  step: number;
}

const steps = [
  { n: 1, label: 'البيانات', icon: <User size={16} /> },
  { n: 2, label: 'مراجعة', icon: <ShoppingBag size={16} /> },
  { n: 3, label: 'تم', icon: <CheckCircle size={16} /> },
];

export default function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              step >= s.n
                ? 'bg-[#c8744a] text-white shadow-md shadow-[#c8744a]/20'
                : 'bg-[#f5e6de] text-[#aaa]'
            }`}
          >
            {s.icon} {s.label}
          </div>
          {i < 2 && (
            <div
              className={`w-8 h-0.5 rounded transition-all duration-300 ${
                step > s.n ? 'bg-[#c8744a]' : 'bg-[#e8ddd2]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
