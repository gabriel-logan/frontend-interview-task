"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

import CartModal from "@/components/CartModal";
import Loading from "@/components/Loading";
import { getProductById } from "@/service/queries";
import { useCart } from "@/zustand/store";

interface ProductIdProps {
  params: {
    productId: string;
  };
}

export default function ProductId({ params: { productId } }: ProductIdProps) {
  const { items, add } = useCart();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 p-10">
      <CartModal />

      <Link
        className="text-white text-xl font-semibold hover:text-blue-200"
        href="/products"
      >
        ← Back to Products
      </Link>

      <h1 className="text-3xl sm:text-4xl md:text-5xl mt-6 font-extrabold mb-8 rounded text-white text-center shadow-lg p-2">
        {product.title}
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="flex justify-center items-center"
        >
          <Image
            className="rounded-xl shadow-xl border-8 border-white"
            src={product.image}
            alt={product.title}
            width={450}
            height={300}
            priority
          />
        </motion.div>

        <div className="text-center lg:text-left text-white max-w-lg">
          <p className="text-xl uppercase font-semibold text-blue-200">
            {product.category}
          </p>
          <p className="text-3xl font-bold mt-4">${product.price}</p>
          <p className="mt-6 text-lg">{product.description}</p>

          <div className="flex flex-col mt-8 gap-4">
            <button className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 hover:shadow-2xl transition-transform duration-300 ease-in-out">
              Buy Now
            </button>
            <button
              className="px-8 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-transform duration-300 ease-in-out"
              onClick={() => {
                if (items.find((i) => i.id === product.id)) {
                  return toast.error("Product already in cart");
                }

                add(product);

                toast.success("Product added to cart", {
                  autoClose: 500,
                });
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
