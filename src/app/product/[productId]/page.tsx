"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound } from "next/navigation";

import Loading from "@/components/Loading";
import { getProductById } from "@/service/queries";

interface ProductIdProps {
  params: {
    productId: string;
  };
}

export default function ProductId({ params: { productId } }: ProductIdProps) {
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-10">
      <h1 className="text-4xl font-bold mb-5 text-white text-shadow-lg text-center">
        {product.title}
      </h1>
      <div className="flex justify-center items-center">
        <Image
          className="rounded-lg shadow-lg border-4 border-white"
          src={product.image}
          alt={product.title}
          width={400}
          height={250}
        />
      </div>
      <div className="text-center mt-5 text-white">
        <p className="text-lg">{product.category}</p>
        <p className="text-2xl font-semibold mt-2">${product.price}</p>
        <p className="mt-4">{product.description}</p>
        <button className="mt-6 px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
}
