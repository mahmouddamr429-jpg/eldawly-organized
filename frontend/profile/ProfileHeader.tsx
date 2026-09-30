'use client';

import { User, Mail, Phone } from 'lucide-react';

interface ProfileHeaderProps {
  user: any;
  isGuest: boolean;
}

export default function ProfileHeader({ user, isGuest }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0ece8] mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-[#f5e6de] flex items-center justify-center text-2xl">
          {isGuest ? '👤' : '🍮'}
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#2d2017]">{user.displayName || 'زائر'}</h2>
          <p className="text-sm text-[#888]">
            {isGuest ? 'حساب زائر' : user.role === 'admin' ? 'مدير' : user.role === 'cashier' ? 'كاشير' : 'عميل'}
          </p>
        </div>
      </div>
      {isGuest && (
        <div className="bg-[#fdf9f5] border border-[#e8ddd2] rounded-xl p-3 text-sm text-[#666]">
          سجل حسابك عشان تتابع طلباتك وتحصل على هدية لما توصل 500 جنيه! 🎁
        </div>
      )}
    </div>
  );
}
