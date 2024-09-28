"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound } from "next/navigation";

import CartModal from "@/components/CartModal";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { getProductById } from "@/service/queries";

interface ProductIdInterceptedProps {
  params: {
    productId: string;
  };
}

export default function ProductIdIntercepted({
  params: { productId },
}: ProductIdInterceptedProps) {
  const parsedProductId = parseInt(productId, 10);

  const { data: product, isLoading } = useQuery({
    queryFn: async () => getProductById(parsedProductId),
    queryKey: ["product"],
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 p-6 sm:p-8 md:p-10">
      <CartModal />

      <Link
        className="text-white text-xl font-semibold hover:text-blue-200"
        href="/products"
      >
        ← Back to Products
      </Link>

      <div className="mt-10 max-w-4xl m-auto">
        <ProductCard product={product} isUnique isInterceptRoute />
      </div>
    </div>
  );
}
