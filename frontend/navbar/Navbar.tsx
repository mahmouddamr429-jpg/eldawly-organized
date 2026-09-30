'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Utensils, Info, Phone, ClipboardList, User } from 'lucide-react';
import { getUser, logout } from '@/lib/api';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import NavActions from './NavActions';

interface NavbarProps { cartCount?: number; onCartClick?: () => void; }

export default function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
    const onStorage = () => setUser(getUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isCustomer = user?.role === 'customer' || user?.role === 'guest' || !user;
  const isAdmin = user?.role === 'admin';
  const isCashier = user?.role === 'cashier';

  const navLinks = isCustomer
    ? [
        { href: '/menu', label: 'المنيو', icon: <Utensils size={16} /> },
        { href: '/about', label: 'عن المحل', icon: <Info size={16} /> },
        { href: '/contact', label: 'تواصل', icon: <Phone size={16} /> },
        { href: '/orders', label: 'طلباتي', icon: <ClipboardList size={16} /> },
        { href: '/profile', label: 'حسابي', icon: <User size={16} /> },
      ]
    : isAdmin
    ? [{ href: '/admin', label: 'لوحة التحكم', icon: <LayoutDashboard size={16} /> }, { href: '/menu', label: 'المنيو', icon: <Utensils size={16} /> }]
    : [{ href: '/cashier', label: 'لوحة الكاشير', icon: <LayoutDashboard size={16} /> }];

  return (
    <>
      <nav className="fixed left-0 right-0 z-[1000] bg-[rgba(253,249,245,0.97)] backdrop-blur-xl shadow-sm" style={{ top: 0, height: 'var(--nav-h, 70px)' }}>
        <div className="max-w-[1240px] mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/menu" className="flex items-center gap-2">
            <span className="text-3xl">🍮</span>
            <div className="leading-tight">
              <div className="text-lg font-extrabold text-[#2d2017]">El Dawly Dessert</div>
              <div className="text-xs font-semibold text-[#d4a843]">حلويات الدولي</div>
            </div>
          </Link>

          <DesktopNav navLinks={navLinks} />
          <NavActions user={user} isCustomer={isCustomer} cartCount={cartCount} onCartClick={onCartClick} onLogout={logout} onMobileToggle={() => setMobileOpen(!mobileOpen)} mobileOpen={mobileOpen} />
        </div>

        {mobileOpen && <MobileNav navLinks={navLinks} user={user} onLogout={logout} />}
      </nav>
      <div style={{ height: 'var(--nav-h, 70px)' }} />
    </>
  );
}
