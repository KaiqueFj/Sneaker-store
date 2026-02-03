"use client";

import { useSneaker } from "@/context/SneakerContext";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function CartItemList({ variant = "full", editable = false }) {
  const { state, dispatch } = useSneaker();

  return (
    <div className="flex flex-col gap-3">
      {state.items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-primary-200">
          <p className="text-primary-400 text-base">Your bag is empty</p>
          <p className="text-sm text-primary-400 mt-2">
            Add some sneakers to get started
          </p>
        </div>
      ) : (
        state.items.map((sneaker) => (
          <div
            key={`${sneaker.id}-${sneaker.size}`}
            className="flex gap-4 border border-primary-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow"
          >
            <Link href={`/sneaker/${sneaker.id}`} className="shrink-0">
              <Image
                src={sneaker.image}
                alt={sneaker.name}
                width={variant === "compact" ? 80 : 140}
                height={variant === "compact" ? 80 : 140}
                className="rounded-lg object-cover hover:opacity-90 transition-opacity"
              />
            </Link>

            <div className="flex flex-col flex-1 justify-between">
              <div className="flex flex-col gap-1">
                <Link href={`/sneaker/${sneaker.id}`}>
                  <h3 className="font-semibold text-primary-600 hover:text-primary-600/80 transition-colors">
                    {sneaker.name}
                  </h3>
                </Link>

                <span className="text-sm text-primary-400 mt-1">
                  Category: {sneaker.category}
                </span>

                <span className="text-sm text-primary-400 mt-1">
                  Colors: {`${sneaker.colors}`.split(",").join(", ")}
                </span>

                <span className="text-sm text-primary-400 mt-1">
                  Size {sneaker.size}
                </span>
              </div>
              <p className="font-semibold text-primary-600 text-base">
                ${sneaker.price.toFixed(2)}
              </p>
            </div>

            {editable && (
              <div className="flex flex-col items-center justify-center gap-3 shrink-0 pl-4 border-l border-primary-200">
                <div className="flex items-center gap-3 bg-primary-50 rounded-lg px-3 py-2">
                  {sneaker.quantity === 1 ? (
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: sneaker })
                      }
                      className="text-red-500 hover:text-red-600 transition-colors"
                      aria-label="Remove from cart"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QUANTITY",
                          payload: sneaker,
                        })
                      }
                      className="text-primary-600 hover:text-primary-600/70 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <MinusCircleIcon className="h-5 w-5" />
                    </button>
                  )}

                  <span className="font-semibold text-sm text-primary-600 w-4 text-center">
                    {sneaker.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_TO_CART", payload: sneaker })
                    }
                    className="text-primary-600 hover:text-primary-600/70 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
