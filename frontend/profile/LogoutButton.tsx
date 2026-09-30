'use client';

import { LogOut } from 'lucide-react';
import { logout } from '@/lib/api';

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="w-full py-3 rounded-full font-bold text-red-500 border-2 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"
    >
      <LogOut size={16} /> تسجيل الخروج
    </button>
  );
}
