"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./cart";

type CartState = {
  items: CartItem[];
  add: (productId: string, quantity?: number) => void;
  update: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(persist((set) => ({
  items: [],
  add: (productId, quantity = 1) => set((state) => {
    const existing = state.items.find((item) => item.productId === productId);
    return { items: existing ? state.items.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item) : [...state.items, { productId, quantity }] };
  }),
  update: (productId, quantity) => set((state) => ({ items: state.items.map((item) => item.productId === productId ? { ...item, quantity } : item).filter((item) => item.quantity > 0) })),
  clear: () => set({ items: [] }),
}), { name: "pop-supply-cart" }));
