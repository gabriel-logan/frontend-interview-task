"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaCartArrowDown, FaShoppingCart } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import CartModal from "@/components/CartModal";
import Loading, { LoadingIcon } from "@/components/Loading";
import getAllProducts from "@/service/queries";
import { useCart } from "@/zustand/store";

export default function Products() {
  const [cartModal, setCartModal] = useState(false);

  const { items, add } = useCart((state) => state);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => {
            setCartModal(true);
          }}
        >
          <FaShoppingCart size={64} color="black" />
        </button>
      </div>

      <CartModal cartModal={cartModal} setCartModal={setCartModal} />

      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
        Explore Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.pages.map((page) => (
          <Fragment key={page.currentPage}>
            {page.data.map((product) => (
              <div
                key={product.id}
                className="group relative p-6 flex gap-6 flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-gray-200"
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition">
                    {product.title}
                  </h2>

                  <p className="text-lg text-gray-600">
                    {parseFloat(product.price).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      currency: "USD",
                      style: "currency",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <Link
                  href={`/products/${product.id}`}
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
                  <button
                    className=""
                    onClick={() => {
                      if (items.find((i) => i.id === product.id)) {
                        return alert("Item already in cart");
                      }
                      add(product);
                    }}
                  >
                    <FaCartArrowDown
                      className="inline-block text-center text-blue-500 active:text-blue-300 ease-in-out duration-200"
                      size={32}
                    />
                  </button>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div ref={ref} className="flex justify-center mt-8">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}
