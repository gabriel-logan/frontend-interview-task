import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Cart } from "@/types/zustand/Cart";
import type { CartModal } from "@/types/zustand/CartModal";

const cartKey = "cart";

export const useCart = create(
  persist<Cart>(
    (set) => ({
      items: [],
      add: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          } else {
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }
        });
      },
      remove: (item) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
        }));
      },
      increaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }));
      },
      decreaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i,
          ),
        }));
      },
    }),
    {
      name: cartKey,
    },
  ),
);

export const useCartModal = create<CartModal>((set) => ({
  cartModal: false,
  setCartModal: (value) => set({ cartModal: value }),
}));
