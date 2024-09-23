"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import Loading from "@/components/Loading";
import { getAllProducts } from "@/service/queries";

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
        Explore Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="group relative p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-gray-200"
          >
            <div className="h-1/6 mb-4">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition">
                {product.title}
              </h2>
              <p className="text-lg text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="h-5/6 flex justify-center items-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={250}
                className="rounded-lg w-auto h-auto object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-10 rounded-xl transition duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
