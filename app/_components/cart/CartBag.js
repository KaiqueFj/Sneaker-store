"use client";

import {
  ArrowDownIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSneaker } from "../../../context/SneakerContext";
import { createOrder } from "../../../lib/data-service";
import { formatCurrency } from "../../../utils/helpers";

export default function CartBag() {
  const { state, dispatch } = useSneaker();
  const { data: session, status } = useSession();
  const router = useRouter();

  const rawTotalPrice = state.items.reduce(
    (acc, sneaker) => acc + sneaker.price * sneaker.quantity,
    0
  );

  const handleOrderBtn = async () => {
    if (!session?.user?.userId) {
      toast.error(
        "You must log in first to place an order! Redirecting you to the login page..."
      );
      setTimeout(() => router.push("/login"), 3000);
      return;
    }

    try {
      await toast.promise(
        createOrder({
          cartItems: state.items,
          total_price: rawTotalPrice,
        }),
        {
          loading: "Saving your order...",
          success: "Order saved successfully!",
          error: "Order could not be done! Try again!",
        }
      );

      dispatch({ type: "CLEAR_CART" });
      router.push("/account/orders/thankyou");
    } catch (error) {
      console.error("Order error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-6 max-w-7xl mx-auto w-full">
      {/* Bag details */}
      <div className="flex flex-col gap-6 flex-1 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary-600">
          Your Bag
        </h1>

        {state.items.length === 0 ? (
          <p className="text-primary-600">There are no items in your bag.</p>
        ) : (
          state.items.map((sneaker) => (
            <div
              key={`${sneaker.id}-${sneaker.size}`}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 border rounded-2xl p-4 shadow-sm bg-white"
            >
              {/* Sneaker image */}
              <Link href={`/sneaker/${sneaker.id}`}>
                <Image
                  src={sneaker.image}
                  alt={sneaker.name}
                  width={140}
                  height={120}
                  className="rounded-xl object-cover w-full md:w-35 h-auto"
                />
              </Link>

              {/* Sneaker info */}
              <div className="flex flex-col flex-1">
                <span className="text-lg md:text-base font-semibold text-primary-600">
                  {sneaker.name}
                </span>
                <span className="text-sm font-medium text-primary-600/50">
                  {sneaker.category}
                </span>
                <span className="text-base font-semibold text-primary-600 mt-1">
                  ${sneaker.price}
                </span>
                <span className="text-sm font-medium text-primary-600/50">
                  Size {sneaker.size}
                </span>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center border border-primary-500/20 rounded-full px-4 py-1 gap-3">
                {sneaker.quantity > 1 ? (
                  <button
                    onClick={() =>
                      dispatch({ type: "DECREASE_QUANTITY", payload: sneaker })
                    }
                  >
                    <MinusCircleIcon className="h-6 w-6 text-primary-600" />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: sneaker })
                    }
                  >
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </button>
                )}
                <span className="text-lg font-medium text-primary-600">
                  {sneaker.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: sneaker })
                  }
                >
                  <PlusCircleIcon className="h-6 w-6 text-primary-600" />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Shipping info */}
        <div className="mt-6">
          <span className="text-lg font-medium text-primary-600">Shipping</span>
          <div className="flex gap-1 text-sm">
            <span className="text-primary-600">Arrives by Fri, Sep 5 to</span>
            <span className="font-semibold text-primary-600 underline underline-offset-2">
              06765001
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col flex-1 md:max-w-sm bg-white shadow-md rounded-2xl p-6 h-fit">
        <h2 className="text-2xl font-semibold mb-6 text-primary-600">
          Summary
        </h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-medium text-primary-600">
            Do you have a Promo code?
          </span>
          <ArrowDownIcon className="h-5 w-5 text-primary-600" />
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-base text-primary-600">Subtotal</span>
          <span className="text-base font-semibold text-primary-600">
            {formatCurrency(rawTotalPrice)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-base text-primary-600">
            Shipping & Handling
          </span>
          <span className="text-base font-semibold text-primary-600">Free</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-base text-primary-600">Estimated Tax</span>
          <span className="text-base font-semibold text-primary-600">—</span>
        </div>
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <span className="text-lg font-semibold text-primary-600">Total</span>
          <span className="text-lg font-bold text-primary-600">
            {formatCurrency(
              state.items.reduce(
                (acc, sneaker) => acc + sneaker.price * sneaker.quantity,
                0
              )
            )}
          </span>
        </div>
        {state.items.length > 0 && (
          <button
            onClick={handleOrderBtn}
            disabled={status === "loading"}
            className="disabled:opacity-50 mt-6 w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-600 transition"
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}
