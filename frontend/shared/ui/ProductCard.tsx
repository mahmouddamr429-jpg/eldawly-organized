'use client';

import { Plus } from 'lucide-react';
import { getEmoji } from '@/lib/constants';

interface ProductCardProps { product: any; onAdd: (product: any) => void; hasImage?: boolean; }

export default function ProductCard({ product, onAdd, hasImage }: ProductCardProps) {
  const isInlineImage = /^data:image\/(avif|jpeg|png|webp);base64,/i.test(product.image || '');
  const imageAvailable = hasImage && (isInlineImage || /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(product.image || ''));
  const imageSource = isInlineImage || /^(https?:\/\/|\/)/i.test(product.image || '')
    ? product.image
    : `/images/products/${product.image}`;

  return (
    <div className="product-card-3d group bg-white rounded-2xl overflow-hidden border border-[#f0ece8]">
      <div className="relative h-44 bg-gradient-to-br from-[#f5e6de] to-[#fdf3dc] flex items-center justify-center overflow-hidden">
        {imageAvailable ? (
          <>
            <img src={imageSource} alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const emoji = img.nextElementSibling;
                if (emoji) emoji.classList.remove('hidden');
              }} />
            <span className="text-6xl drop-shadow-md transition-transform duration-300 group-hover:scale-110 hidden">{getEmoji(product.image)}</span>
          </>
        ) : (
          <span className="text-6xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">{getEmoji(product.image)}</span>
        )}
        {product.featured && (
          <span className="sparkle absolute top-2.5 right-2.5 bg-[#c8744a] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full z-10 shadow-md shadow-[#c8744a]/30">
            ⭐ الأشهر
          </span>
        )}
        <button
          type="button"
          aria-label={`أضف ${product.name} للسلة`}
          title={`أضف ${product.name} للسلة`}
          className="absolute bottom-2.5 left-2.5 w-9 h-9 rounded-full bg-white text-[#c8744a] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#c8744a] hover:text-white z-10"
          onClick={() => onAdd(product)}>
          <Plus size={15} />
        </button>
      </div>
      <div className="p-3">
        <div className="text-[10px] font-extrabold text-[#c8744a] mb-0.5">{product.category}</div>
        <h3 className="text-sm font-extrabold text-[#2d2017] mb-1 leading-snug truncate">{product.name}</h3>
        <div className="flex items-center justify-between pt-1.5 border-t border-[#f0ece8]">
          <span className="text-[#c8744a] font-extrabold">{product.price} <span className="text-[10px]">ج</span></span>
          <span className="text-xs text-[#bbb]">⭐ {product.rating}</span>
        </div>
      </div>
    </div>
  );
}
