import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";

import type { Product } from "@/types/Products";
import { useCart } from "@/zustand/store";

import RatingStars from "./RatingStars";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, add } = useCart((state) => state);

  return (
    <div className="group relative p-6 flex gap-6 flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-gray-200">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition">
          {product.title}
        </h2>

        <p className="text-lg text-gray-600">
          {product.price.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            currency: "USD",
            style: "currency",
          })}
        </p>
        <p className="text-sm text-gray-500 flex gap-1">
          {product.rating.count} reviews | {product.rating.rate}
          <RatingStars rating={product.rating.rate} />
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
          width={200}
          height={200}
          priority
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
              return toast.error("Product already in cart");
            }
            add(product);
            toast.success("Product added to cart", {
              autoClose: 500,
            });
          }}
        >
          <FaCartArrowDown
            className="inline-block text-center text-blue-500 active:text-blue-300 ease-in-out duration-200"
            size={32}
          />
        </button>
      </div>
    </div>
  );
}
