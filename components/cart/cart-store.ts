"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
};

type CartState = {
  items: CartItem[];
  drawerOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      drawerOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((cartItem) => cartItem.id === item.id);
          if (existing) {
            return {
              drawerOpen: true,
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + (item.quantity ?? 1) }
                  : cartItem
              )
            };
          }
          return {
            drawerOpen: true,
            items: [...state.items, { ...item, quantity: item.quantity ?? 1 }]
          };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false })
    }),
    { name: "flowers-boutique-cart" }
  )
);

export function useCartTotals() {
  const items = useCart((state) => state.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return { count, subtotal };
}
