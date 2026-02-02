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
    <div className="flex flex-col gap-4">
      {state.items.map((sneaker) => (
        <div
          key={`${sneaker.id}-${sneaker.size}`}
          className="flex gap-4 border rounded-2xl p-4 shadow-sm bg-white"
        >
          <Link href={`/sneaker/${sneaker.id}`}>
            <Image
              src={sneaker.image}
              alt={sneaker.name}
              width={variant === "compact" ? 80 : 140}
              height={80}
              className="rounded-lg object-cover"
            />
          </Link>

          <div className="flex flex-col flex-1">
            <span className="font-semibold text-primary-600">
              {sneaker.name}
            </span>
            <span className="text-sm text-primary-600/50">
              Size {sneaker.size}
            </span>
            <span className="font-medium">${sneaker.price}</span>
          </div>

          {editable && (
            <div className="flex items-center gap-2">
              {sneaker.quantity > 1 ? (
                <button
                  onClick={() =>
                    dispatch({ type: "DECREASE_QUANTITY", payload: sneaker })
                  }
                >
                  <MinusCircleIcon className="h-6 w-6" />
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

              <span>{sneaker.quantity}</span>

              <button
                onClick={() =>
                  dispatch({ type: "ADD_TO_CART", payload: sneaker })
                }
              >
                <PlusCircleIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
