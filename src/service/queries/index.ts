import { Product, Products } from "@/types/Products";

import { fetcher } from "../fetcher/axiosInstance";

export async function getAllProducts(): Promise<Products> {
  return fetcher("/products");
}

export async function getProductById(id: number): Promise<Product> {
  return fetcher(`/products/${id}`);
}
