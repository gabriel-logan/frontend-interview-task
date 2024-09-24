import { create } from "zustand";

import type { Cart } from "@/types/zustand/Cart";
import type { CartModal } from "@/types/zustand/CartModal";

import localStorageMiddleware from "./middlewares/localStorage";

const cartKey = "cart";

const initialState: Cart = JSON.parse(
  localStorage.getItem(cartKey) || '{"items":[]}',
);

export const useCart = create<Cart>(
  localStorageMiddleware((set) => {
    return {
      ...initialState,
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
    };
  }, cartKey),
);

export const useCartModal = create<CartModal>((set) => ({
  cartModal: false,
  setCartModal: (value) => set({ cartModal: value }),
}));
