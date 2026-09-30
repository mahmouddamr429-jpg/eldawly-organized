'use client';

import { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { Footer } from '../shared/ui';
import { getUser } from '../lib/api';
import ProfileHeader from './ProfileHeader';
import AccountDetails from './AccountDetails';
import ProfileStats from './ProfileStats';
import LogoutButton from './LogoutButton';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { window.location.href = '/login'; return; }
    setUser(u);
  }, []);

  if (!user) return null;
  const isGuest = user.role === 'guest';

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ direction: 'rtl' }}>
      <Navbar />
      <section className="py-12 bg-[#fdf9f5] flex-1 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#c8744a]/5 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-[600px] mx-auto px-4 relative z-10">
          <ProfileHeader user={user} isGuest={isGuest} />
          {!isGuest && (
            <>
              <AccountDetails user={user} />
              <ProfileStats user={user} />
            </>
          )}
          <LogoutButton />
        </div>
      </section>
      <Footer />
    </div>
  );
}
