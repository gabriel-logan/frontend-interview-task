"use client";

import Image from "next/image";
import { useState, type Dispatch, type SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoClose, IoRemoveCircle } from "react-icons/io5";
import ReactModal from "react-modal";
import { toast } from "react-toastify";

import { useCart } from "@/zustand/store";

interface CartModalProps {
  setCartModal: Dispatch<SetStateAction<boolean>>;
  cartModal: boolean;
}

export default function CartModal({ cartModal, setCartModal }: CartModalProps) {
  const { items, remove, increaseQuantity, decreaseQuantity } = useCart(
    (state) => state,
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const increaseQuantityLocal = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
    increaseQuantity(parseInt(id));
  };

  const decreaseQuantityLocal = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
    decreaseQuantity(parseInt(id));
  };

  const calculateItemTotalPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  const calculateCartTotalPrice = () => {
    return items.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + calculateItemTotalPrice(item.price, quantity);
    }, 0);
  };

  return (
    <ReactModal
      isOpen={cartModal}
      shouldCloseOnEsc={true}
      style={{
        content: {
          backgroundColor: "white",
          color: "black",
          width: "80%",
          height: "80%",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
      ariaHideApp={false}
    >
      <div className="relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          onClick={() => {
            setCartModal(false);
          }}
        >
          <IoClose size={32} />
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
        <div className="space-y-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.title}
                    className="rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          decreaseQuantityLocal(item.id.toString())
                        }
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="text-lg font-semibold">
                        {quantities[item.id] || 1}
                      </span>
                      <button
                        onClick={() =>
                          increaseQuantityLocal(item.id.toString())
                        }
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="text-red-500 hover:text-red-700 transition mb-2"
                    onClick={() => {
                      remove(item);
                      toast.info("Product removed from cart", {
                        autoClose: 500,
                      });
                    }}
                  >
                    <IoRemoveCircle size={24} />
                  </button>
                  <p className="text-lg font-semibold">
                    {calculateItemTotalPrice(
                      item.price,
                      quantities[item.id] || 1,
                    ).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      currency: "USD",
                      style: "currency",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
        {items.length > 0 && (
          <div className="mt-8">
            <p className="text-lg font-semibold text-right">
              Total:{" "}
              {calculateCartTotalPrice().toLocaleString("en-US", {
                maximumFractionDigits: 2,
                currency: "USD",
                style: "currency",
              })}
            </p>
            <div className="text-right mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </ReactModal>
  );
}
