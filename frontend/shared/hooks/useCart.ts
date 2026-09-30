'use client';
import { useState, useCallback } from 'react';

export function useCart() {
  const [cart, setCart] = useState<any[]>([]);
  const addToCart = useCallback((p: any) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 }];
    });
  }, []);
  const updateQty = (id: number, d: number) => setCart(prev => {
    const it = prev.find(i => i.id === id);
    return !it ? prev : it.qty + d <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: i.qty + d } : i);
  });
  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const clearCart = () => setCart([]);
  return { cart, setCart, addToCart, updateQty, removeFromCart, cartTotal, cartCount, clearCart };
}
