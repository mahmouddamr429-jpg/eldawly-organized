'use client';

import { useEffect } from 'react';
import { getUser } from '../lib/api';
import RedirectLoader from './RedirectLoader';

export default function RootPage() {
  useEffect(() => {
    const user = getUser();
    if (!user) { window.location.href = '/login'; return; }
    if (user.role === 'admin') window.location.href = '/admin';
    else if (user.role === 'cashier') window.location.href = '/cashier';
    else window.location.href = '/menu';
  }, []);

  return <RedirectLoader />;
}
