import type { Product, Products } from "../Products";

export interface Cart {
  items: Products;
  add: (item: Product) => void;
  remove: (item: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}
