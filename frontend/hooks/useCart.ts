import { useState, useCallback, useEffect } from 'react';

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  qty: number;
  stock?: number;
  image?: string;
  category?: string;
}

export function useCart() {
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let restored: CartItem[] = [];
    try {
      const saved = localStorage.getItem('eldawly_cart') ?? localStorage.getItem('cart');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          restored = parsed.filter((item): item is CartItem =>
            item !== null &&
            typeof item === 'object' &&
            (typeof item.id === 'number' || typeof item.id === 'string') &&
            typeof item.name === 'string' &&
            Number.isFinite(item.price) &&
            item.price >= 0 &&
            Number.isInteger(item.qty) &&
            item.qty > 0
          );
        }
      }
    } catch (error) {
      console.error('Unable to restore saved cart:', error);
    }
    setCartState(restored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('eldawly_cart', JSON.stringify(cart));
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Unable to save cart:', error);
    }
  }, [cart, ready]);

  const addToCart = useCallback((product: CartItem) => {
    const existing = cart.find(item => item.id === product.id);
    const stock = Number(product.stock);
    if (Number.isFinite(stock) && (stock <= 0 || (existing && existing.qty >= stock))) return false;

    setCartState(previous => {
      const currentItem = previous.find(item => item.id === product.id);
      if (Number.isFinite(stock) && (stock <= 0 || (currentItem && currentItem.qty >= stock))) return previous;
      return currentItem
        ? previous.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...previous, { ...product, qty: 1 }];
    });
    return true;
  }, [cart]);

  const updateQty = useCallback((id: number | string, delta: number) => {
    setCartState(prev => {
      const newCart = prev.map(item =>
        item.id === id ? {
          ...item,
          qty: Math.min(
            Number.isFinite(Number(item.stock)) ? Number(item.stock) : Number.MAX_SAFE_INTEGER,
            Math.max(0, item.qty + delta),
          ),
        } : item
      );
      return newCart.filter(item => item.qty > 0);
    });
  }, []);

  const removeFromCart = useCallback((id: number | string) => {
    setCartState(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartState([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  };
}
