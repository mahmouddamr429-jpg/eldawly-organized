'use client';

import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const IC = 'w-full border-2 border-[#e8ddd2] rounded-xl px-4 py-2.5 text-sm bg-[#fdf9f5] outline-none focus:border-[#c8744a] focus:bg-white transition-all duration-200';
const IC_ERR = 'w-full border-2 border-red-300 rounded-xl px-4 py-2.5 text-sm bg-red-50/50 outline-none focus:border-red-500 focus:bg-white transition-all duration-200';

interface LoginFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  dir?: 'ltr' | 'rtl';
  error?: string;
  icon?: React.ReactNode;
  showToggle?: boolean;
  visible?: boolean;
  onToggle?: () => void;
  filter?: (v: string) => string;
}

export default function LoginField({
  label, type = 'text', value, onChange, placeholder, dir, error, icon, showToggle, visible, onToggle, filter
}: LoginFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(filter ? filter(e.target.value) : e.target.value);
  };

  const hasToggle = showToggle && onToggle;
  const inputCls = error ? IC_ERR : IC;

  return (
    <div>
      <label className="block font-bold text-sm text-[#2d2017] mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={showToggle ? (visible ? 'text' : 'password') : type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          dir={dir}
          className={`${inputCls} ${hasToggle ? 'pl-10' : ''} ${icon ? 'pl-9' : ''}`}
        />
        {icon && <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[#aaa]">{icon}</span>}
        {hasToggle && (
          <button type="button" onClick={onToggle} className="absolute top-1/2 -translate-y-1/2 left-3 text-[#aaa] hover:text-[#2d2017]">
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
