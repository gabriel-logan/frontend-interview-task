"use client";

import { MdOutlineShoppingCart } from "react-icons/md";

import { useCart, useCartModal } from "@/zustand/store";

export default function HeaderProducts() {
  const { setCartModal, cartModal } = useCartModal();
  const { items } = useCart();

  return (
    <header className="pb-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div className="flex w-full h-24 z-50 justify-between items-center fixed bg-opacity-90 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl sm:text-4xl ml-6 font-extrabold text-blue-100 text-center tracking-wide drop-shadow-lg">
          Explore Our Products
        </h1>
        <div className="mr-6">
          <button
            datatype="cart-link"
            onClick={() => {
              setCartModal(!cartModal);
            }}
            className="relative p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-xl focus:outline-none"
          >
            <MdOutlineShoppingCart className="text-3xl md:text-5xl text-white" />
            {items.length > 0 ? (
              <>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-gray-900 bg-red-500 animate-ping"></span>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
              </>
            ) : (
              <>
                <span className="absolute top-1 right-1 block h-1 w-1 rounded-full bg-green-500"></span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
