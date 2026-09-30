'use client';

interface StockHealthBarProps {
  productCount: number;
  availableCount: number;
  lowOnlyCount: number;
  outOfStockCount: number;
}

export default function StockHealthBar({ productCount, availableCount, lowOnlyCount, outOfStockCount }: StockHealthBarProps) {
  if (productCount === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece8]">
      <h3 className="text-sm font-extrabold text-[#2d2017] mb-3">صحة المخزون</h3>
      <div className="w-full h-5 bg-[#f0ece8] rounded-full overflow-hidden flex">
        {availableCount > 0 && <div className="h-full bg-green-500 transition-all duration-700" style={{ width: `${(availableCount / productCount) * 100}%` }} title={`متوفرة: ${availableCount}`} />}
        {lowOnlyCount > 0 && <div className="h-full bg-amber-400 transition-all duration-700" style={{ width: `${(lowOnlyCount / productCount) * 100}%` }} title={`حرجة: ${lowOnlyCount}`} />}
        {outOfStockCount > 0 && <div className="h-full bg-red-500 transition-all duration-700" style={{ width: `${(outOfStockCount / productCount) * 100}%` }} title={`نفذت: ${outOfStockCount}`} />}
      </div>
      <div className="flex gap-4 mt-2 text-[10px]">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> متوفرة ({availableCount})</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> حرجة ({lowOnlyCount})</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> نفذت ({outOfStockCount})</span>
      </div>
    </div>
  );
}
