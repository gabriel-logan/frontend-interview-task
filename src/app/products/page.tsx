"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import CartModal from "@/components/CartModal";
import Loading, { LoadingIcon } from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import getAllProducts from "@/service/queries";

export default function Products() {
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
      <CartModal />

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
