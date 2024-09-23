"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";

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
          <div
            key={product.id}
            className="group relative p-6 flex gap-6 flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition">
                {product.title}
              </h2>

              <p className="text-lg text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <Link
              href={`/product/${product.id}`}
              className="flex h-full justify-center items-center overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={250}
                className="rounded-lg w-auto h-auto object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <div className="flex flex-col items-center justify-center gap-2">
              <button className="text-blue-500 text-lg hover:text-blue-400 active:text-blue-600 ease-in-out duration-200">
                Buy Now
              </button>
              <button className="">
                <FaCartArrowDown
                  className="inline-block text-center text-blue-500 active:text-blue-300 ease-in-out duration-200"
                  size={32}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
