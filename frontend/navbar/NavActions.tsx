'use client';

import { ShoppingBag, X, LogOut, Gift } from 'lucide-react';

interface NavActionsProps {
  user: any;
  isCustomer: boolean;
  cartCount: number;
  onCartClick?: () => void;
  onLogout: () => void;
  onMobileToggle: () => void;
  mobileOpen: boolean;
}

export default function NavActions({ user, isCustomer, cartCount, onCartClick, onLogout, onMobileToggle, mobileOpen }: NavActionsProps) {
  return (
    <div className="flex items-center gap-1">
      {user && user.role !== 'guest' && (
        <span className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#f5e6de] text-[#c8744a]">
          {user.loyaltyGift && <Gift size={12} className="text-[#d4a843]" />} {user.displayName}
        </span>
      )}
      {isCustomer && (
        <button onClick={onCartClick} className="relative w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-[rgba(200,116,74,0.15)] text-[#2d2017]" aria-label="السلة">
          <ShoppingBag size={18} />
          {cartCount > 0 && <span className="absolute -top-1 -left-1 w-5 h-5 text-white rounded-full flex items-center justify-center text-[10px] font-bold bg-[#c8744a] border-2 border-white">{cartCount}</span>}
        </button>
      )}
      {user && (
        <button onClick={onLogout} className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-[#888] hover:text-[#c8744a]">
          <LogOut size={14} /> خروج
        </button>
      )}
      <button onClick={onMobileToggle} className="md:hidden w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-[rgba(200,116,74,0.15)] text-[#2d2017]">
        {mobileOpen ? <X size={18} /> : <span className="text-xl">☰</span>}
      </button>
    </div>
  );
}
