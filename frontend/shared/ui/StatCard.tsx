'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
  index?: number;
}

export default function StatCard({ label, value, color, icon, index = 0 }: StatCardProps) {
  return (
    <div className="stat-card-enter bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}>
      {icon && <div className={`w-11 h-11 rounded-xl ${color || 'bg-[#c8744a]'} text-white flex items-center justify-center mb-3`}>{icon}</div>}
      <div className="text-2xl font-black text-[#2d2017]">{value}</div>
      <div className="text-xs text-[#888] font-bold mt-1">{label}</div>
    </div>
  );
}
