'use client';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  dir?: string;
  required?: boolean;
}

export default function FormField({ label, value, onChange, type = 'text', placeholder, dir, required }: FormFieldProps) {
  return (
    <div>
      <label className="block font-bold text-sm text-[#2d2017] mb-1">
        {label}{required && ' *'}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} dir={dir}
        className="w-full border-2 border-[#e8ddd2] rounded-xl px-4 py-2.5 text-sm bg-[#fdf9f5] outline-none focus:border-[#c8744a]" />
    </div>
  );
}
