import { create } from "zustand";

import type { Cart } from "@/types/zustand/Cart";

export const useCart = create<Cart>((set) => ({
  items: [],
  add: (item) => {
    set((state) => ({ items: [...state.items, item] }));
  },
  remove: (item) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== item.id) }));
  },
}));
