import { useState, useCallback, useEffect } from 'react';

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  category?: string;
}

export function useCart() {
  const [cart, setCartState] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCartState(JSON.parse(saved));
      } catch {
        setCartState([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const setCart = useCallback((items: CartItem[]) => {
    setCartState(items);
  }, []);

  const addToCart = useCallback((product: any) => {
    setCartState(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: number | string, delta: number) => {
    setCartState(prev => {
      const newCart = prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
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
    setCart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  };
}


