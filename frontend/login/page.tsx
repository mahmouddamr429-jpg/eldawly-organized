'use client';

import { useState } from 'react';
import { Lock, User, Sparkles, AlertCircle } from 'lucide-react';
import LoginHero from './LoginHero';
import StaffLoginForm from './StaffLoginForm';
import CustomerRegisterForm from './CustomerRegisterForm';

type TabType = 'admin' | 'cashier' | 'customer';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<TabType>('customer');
  const [error, setError] = useState('');

  const tabs: { key: TabType; label: string; icon: React.ReactNode; desc: string }[] = [
    { key: 'admin', label: 'المدير', icon: <Lock size={16} />, desc: 'لوحة التحكم' },
    { key: 'cashier', label: 'الكاشير', icon: <User size={16} />, desc: 'إدارة الطلبات' },
    { key: 'customer', label: 'عميل', icon: <Sparkles size={16} />, desc: 'اطلب أونلاين' },
  ];

  const switchTab = (key: TabType) => {
    setActiveTab(key);
    setError('');
  };

  return (
    <div className="min-h-screen flex" style={{ direction: 'rtl' }}>
      <LoginHero />

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fdf9f5 0%, #f5e6de 50%, #fdf3dc 100%)' }}>

        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#c8744a]/5 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#c8744a]/3 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden text-center mb-8">
            <span className="text-5xl block mb-3 float-bounce">🍮</span>
            <h1 className="text-2xl font-black text-[#2d2017]">El Dawly Dessert</h1>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[#e8ddd2]">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => switchTab(tab.key)}
                  className={`flex-1 py-4 text-sm font-bold flex flex-col items-center gap-0.5 transition-all ${
                    activeTab === tab.key ? 'text-[#c8744a] border-b-2 border-[#c8744a] bg-[#fdf9f5]' : 'text-[#999] hover:text-[#c8744a]'
                  }`}>
                  <span className="flex items-center gap-1.5">{tab.icon} {tab.label}</span>
                  <span className="text-[10px] opacity-60">{tab.desc}</span>
                </button>
              ))}
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-bold mb-4 flex items-center gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              {(activeTab === 'admin' || activeTab === 'cashier') && (
                <StaffLoginForm role={activeTab} onError={setError} />
              )}

              {activeTab === 'customer' && (
                <CustomerRegisterForm onError={setError} />
              )}
            </div>
          </div>

          <p className="text-center mt-6 text-xs text-[#aaa]">مسله، الفيوم — 01000905623</p>
        </div>
      </div>
    </div>
  );
}
