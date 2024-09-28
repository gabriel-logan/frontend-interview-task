import { fetcher } from "@/actions/fetcher";
import type { Product, Products } from "@/types/Products";

export async function getAllProducts(): Promise<Products | undefined> {
  try {
    return await fetcher<Products>(`/products`);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProductsInfinityScroll({ pageParam = 0 }): Promise<{
  data: Products;
  currentPage: number;
  nextPage: number | undefined;
}> {
  const limit = 5;

  const products = await getAllProducts();

  if (!products) {
    return {
      data: [],
      currentPage: 0,
      nextPage: undefined,
    };
  }

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

export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    return fetcher(`/products/${id}`);
  } catch (error) {
    console.error(error);
  }
}
