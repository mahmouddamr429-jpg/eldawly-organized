'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DesktopNavProps {
  navLinks: { href: string; label: string; icon: React.ReactNode }[];
}

export default function DesktopNav({ navLinks }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex items-center gap-7 m-0 p-0 list-none">
      {navLinks.map(link => (
        <li key={link.href}>
          <Link href={link.href} className={`flex items-center gap-1.5 font-bold text-sm pb-0.5 transition-colors ${pathname === link.href ? 'text-[#c8744a]' : 'text-[#2d2017] hover:text-[#c8744a]'}`}>
            {link.icon} {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
