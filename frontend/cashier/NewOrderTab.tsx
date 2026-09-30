'use client';

import CashierProductGrid from './CashierProductGrid';
import CashierCart from './CashierCart';

interface NewOrderTabProps {
  products: any[];
  categories: string[];
  activeCat: string;
  onCatChange: (cat: string) => void;
  cart: any[];
  cartTotal: number;
  addToCart: (p: any) => void;
  updateQty: (id: number, d: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  customerName: string;
  setCustomerName: (v: string) => void;
  amountPaid: string;
  setAmountPaid: (v: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  animKey: number;
}

export default function NewOrderTab({
  products, categories, activeCat, onCatChange, cart, cartTotal, addToCart, updateQty, removeFromCart,
  customerName, setCustomerName, amountPaid, setAmountPaid, onSubmit, submitting, animKey
}: NewOrderTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CashierProductGrid products={products} categories={categories} activeCat={activeCat} onCatChange={onCatChange} onAddToCart={addToCart} animKey={animKey} />
      <CashierCart cart={cart} cartTotal={cartTotal} updateQty={updateQty} removeFromCart={removeFromCart}
        customerName={customerName} setCustomerName={setCustomerName} amountPaid={amountPaid} setAmountPaid={setAmountPaid} onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}
