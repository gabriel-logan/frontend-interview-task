import { fetcher } from "@/actions/fetcher";
import type { Product, Products } from "@/types/Products";

export default async function getAllProducts({ pageParam = 0 }): Promise<{
  data: Products;
  currentPage: number;
  nextPage: number | undefined;
}> {
  const limit = 5;

  const products = await fetcher<Products>(`/products`);

  const productsLimited: Products = products.slice(
    pageParam * limit,
    (pageParam + 1) * limit,
  );

  return {
    data: productsLimited,
    currentPage: pageParam,
    nextPage: productsLimited.length === limit ? pageParam + 1 : undefined,
  };
}

export async function getProductById(id: number): Promise<Product> {
  return fetcher(`/products/${id}`);
}
