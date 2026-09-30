'use client';

import { getEmoji } from '../lib/constants';

interface CashierProductGridProps {
  products: any[];
  categories: string[];
  activeCat: string;
  onCatChange: (cat: string) => void;
  onAddToCart: (p: any) => void;
  animKey: number;
}

export default function CashierProductGrid({ products, categories, activeCat, onCatChange, onAddToCart, animKey }: CashierProductGridProps) {
  const filteredProducts = activeCat === 'الكل' ? products : products.filter(p => p.category === activeCat);

  return (
    <div className="lg:col-span-2">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => onCatChange(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              activeCat === cat ? 'bg-[#c8744a] text-white border-[#c8744a]' : 'border-[#e8ddd2] text-[#888] hover:border-[#c8744a]'
            }`}>{cat}</button>
        ))}
      </div>
      <div key={animKey} className="cat-slide-in grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto">
        {filteredProducts.map((p, i) => (
          <button key={p.id} onClick={() => onAddToCart(p)}
            className="card-fade-up bg-white rounded-xl p-3 border border-[#f0ece8] text-right hover:border-[#c8744a] hover:shadow-md transition-all"
            style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
            <div className="h-20 bg-gradient-to-br from-[#f5e6de] to-[#fdf3dc] rounded-lg flex items-center justify-center mb-2 overflow-hidden">
              <img src={`/images/products/${p.image}`} alt={p.name} className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }} />
              <span className="text-3xl hidden">{getEmoji(p.image)}</span>
            </div>
            <div className="text-xs font-extrabold text-[#2d2017] truncate">{p.name}</div>
            <div className="text-xs text-[#c8744a] font-bold">{p.price} ج</div>
          </button>
        ))}
      </div>
    </div>
  );
}
