'use client';

interface StatusBadgeProps {
  status: string;
}

const MAP: Record<string, { label: string; cls: string }> = {
  pending: { label: 'معلق ⏳', cls: 'bg-amber-100 text-amber-700' },
  preparing: { label: 'جهز 🔥', cls: 'bg-blue-100 text-blue-700' },
  delivering: { label: 'توصل 🚚', cls: 'bg-purple-100 text-purple-700' },
  completed: { label: 'مكتمل ✓', cls: 'bg-green-100 text-green-600' },
  cancelled: { label: 'ملغي ✗', cls: 'bg-red-100 text-red-600' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = MAP[status] || MAP.pending;
  return <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${s.cls}`}>{s.label}</span>;
}
