'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface MobileNavProps {
  navLinks: { href: string; label: string; icon: React.ReactNode }[];
  user: any;
  onLogout: () => void;
}

export default function MobileNav({ navLinks, user, onLogout }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div className="menu-slide-down md:hidden bg-[rgba(253,249,245,0.99)] px-6 py-5 shadow-lg border-b-2 border-[#f0ece8]">
      {navLinks.map(link => (
        <Link key={link.href} href={link.href} className={`flex items-center gap-2 w-full text-right py-2.5 font-bold ${pathname === link.href ? 'text-[#c8744a]' : 'text-[#2d2017] hover:text-[#c8744a]'}`}>
          {link.icon} {link.label}
        </Link>
      ))}
      {user && (
        <button onClick={onLogout} className="flex items-center gap-2 w-full text-right py-2.5 font-bold text-red-500">
          <LogOut size={16} /> خروج
        </button>
      )}
    </div>
  );
}
