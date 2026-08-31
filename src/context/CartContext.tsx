'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  CartItem,
  getCart,
  addToCart as addToCartLib,
  removeFromCart as removeFromCartLib,
  updateQuantity as updateQuantityLib,
  clearCart as clearCartLib,
  getCartTotal,
  getCartCount,
} from '@/lib/cart';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearAllItems: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(getCart());
    setMounted(true);
  }, []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    const updated = addToCartLib(item, quantity);
    setItems([...updated]);
  }, []);

  const removeItem = useCallback((productId: string) => {
    const updated = removeFromCartLib(productId);
    setItems([...updated]);
  }, []);

  const updateItemQuantity = useCallback((productId: string, quantity: number) => {
    const updated = updateQuantityLib(productId, quantity);
    setItems([...updated]);
  }, []);

  const clearAllItems = useCallback(() => {
    clearCartLib();
    setItems([]);
  }, []);

  const total = getCartTotal(items);
  const count = mounted ? getCartCount(items) : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearAllItems,
        total,
        count,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
