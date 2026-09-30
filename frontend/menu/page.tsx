'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/Navbar';
import { LoadingSpinner, Toast, Footer, HeroSection, ProductCard } from '../shared/ui/index';
import { productApi } from '../lib/api';
import { useCart } from '../hooks/useCart';
import CategorySidebar from './CategorySidebar';
import MobileCategoryBar from './MobileCategoryBar';
import CartDrawer from './CartDrawer';

export default function MenuPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['الكل']);
  const [currentCat, setCurrentCat] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, setCart, addToCart, updateQty, removeFromCart, cartTotal, cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const prevCat = useRef('الكل');

  useEffect(() => { 
    (async () => { 
      try { 
        const [p, c] = await Promise.all([productApi.getAll(), productApi.getCategories()]); 
        setProducts(Array.isArray(p) ? p : p?.data || []); 
        setCategories(c[0] === 'الكل' ? c : ['الكل', ...c]); 
      } catch {} 
      setLoading(false); 
    })(); 
  }, []);
  useEffect(() => { try { const s = localStorage.getItem('eldawly_cart'); if (s) setCart(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { localStorage.setItem('eldawly_cart', JSON.stringify(cart)); }, [cart]);

  const showToast = (msg: string, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
  const onAdd = useCallback((p: any) => { addToCart(p); showToast(`${p.name} اتضاف 🎉`); }, [addToCart]);

  const displayed = currentCat === 'الكل'
    ? (searchQuery.length > 1 ? products.filter(p => p.name.includes(searchQuery) || (p.description || '').includes(searchQuery)) : products)
    : products.filter(p => p.category === currentCat);

  const handleCatChange = useCallback((cat: string) => {
    if (cat !== prevCat.current) { setAnimKey(k => k + 1); prevCat.current = cat; }
    setCurrentCat(cat);
  }, []);

  const goCheckout = () => {
    localStorage.setItem('eldawly_cart', JSON.stringify(cart));
    router.push('/checkout');
  };

  const getProductCount = (cat: string) => cat === 'الكل' ? products.length : products.filter(p => p.category === cat).length;

  return (
    <div className="page-enter min-h-screen bg-[#fdf9f5]" style={{ direction: 'rtl' }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection title={<>كل حلويات مصر <span className="gradient-text">عندنا</span></>} showSearch searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="ابحث عن حلوى أو مشروب..." />

      <section className="py-6">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex gap-6">
            <CategorySidebar categories={categories} currentCat={currentCat} onChange={handleCatChange} productCount={getProductCount} />
            <MobileCategoryBar categories={categories} currentCat={currentCat} onChange={handleCatChange} />

            <div className="flex-1 min-w-0">
              {loading ? <LoadingSpinner /> : (
                <div key={animKey} className="cat-slide-in grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayed.length > 0 ? displayed.map((p, i) => (
                    <div key={p.id} className="card-fade-up" style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                      <ProductCard product={p} onAdd={onAdd} hasImage={true} />
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-16 text-[#aaa]">
                      <div className="text-4xl mb-3">🔍</div><p>مفيش نتائج</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CartDrawer open={cartOpen} cart={cart} cartTotal={cartTotal} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={goCheckout} onClose={() => setCartOpen(false)} />

      {toast && <Toast message={toast.msg} type={toast.type as 'ok' | 'warn'} onClose={() => setToast(null)} />}
      <Footer />
    </div>
  );
}
