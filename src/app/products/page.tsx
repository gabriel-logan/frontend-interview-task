"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import CartModal from "@/components/CartModal";
import Loading, { LoadingIcon } from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import getAllProducts from "@/service/queries";
import { useCartModal } from "@/zustand/store";

export default function Products() {
  const { setCartModal } = useCartModal();

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
          <FaShoppingCart className="text-3xl md:text-6xl" color="black" />
        </button>
      </div>

      <CartModal />

      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
        Explore Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.pages.map((page) => (
          <Fragment key={page.currentPage}>
            {page.data.map((product) => (
              <ProductCard key={product.id} product={product} />
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
