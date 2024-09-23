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
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-semibold mb-5">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="p-4 rounded-lg shadow-md border"
          >
            <div className="h-1/6">
              <h1 className="text-xl font-semibold">{product.title}</h1>
              <p className="">${product.price}</p>
            </div>
            <div className="h-5/6 flex justify-center items-center">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={250}
                className="rounded-lg w-auto h-auto"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
