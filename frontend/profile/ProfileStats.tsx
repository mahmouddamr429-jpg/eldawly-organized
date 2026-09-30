'use client';

import { ShoppingBag, Gift } from 'lucide-react';

interface ProfileStatsProps {
  user: any;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8] mb-6">
      <h3 className="text-lg font-extrabold text-[#2d2017] mb-4">إحصائيات</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#fdf9f5] rounded-xl p-4 text-center">
          <ShoppingBag size={20} className="text-[#c8744a] mx-auto mb-2" />
          <div className="text-2xl font-extrabold text-[#2d2017]">
            {(user.totalSpent || 0).toFixed(0)} <span className="text-sm">ج</span>
          </div>
          <div className="text-xs text-[#888]">إجمالي المشتريات</div>
        </div>
        <div className="bg-[#fdf9f5] rounded-xl p-4 text-center">
          <Gift size={20} className={`${user.loyaltyGift ? 'text-[#d4a843]' : 'text-[#ccc]'} mx-auto mb-2`} />
          <div className="text-2xl font-extrabold text-[#2d2017]">{user.loyaltyGift ? '🎉' : '—'}</div>
          <div className="text-xs text-[#888]">هدية الولاء</div>
        </div>
      </div>
      {!user.loyaltyGift && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-[#888] mb-1">
            <span>تقدم نحو الهدية</span>
            <span>{(user.totalSpent || 0).toFixed(0)} / 500 ج</span>
          </div>
          <div className="w-full h-3 bg-[#f0ece8] rounded-full overflow-hidden">
            <div
              className="progress-fill h-full rounded-full"
              style={{
                width: `${Math.min(((user.totalSpent || 0) / 500) * 100, 100)}%`,
                background: 'linear-gradient(to left, #c8744a, #d4a843)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
