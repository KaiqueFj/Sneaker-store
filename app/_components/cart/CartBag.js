"use client";

import React from "react";
import { useSneaker } from "../Sneakers/SneakerContext";
import Image from "next/image";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function CartBag() {
  const { state } = useSneaker();
  return (
    <div>
      {/* Bag details with the sneaker in it */}
      <div className="flex flex-col gap-4">
        <h1>Bag</h1>

        <div className="flex flex-col gap-4">
          {state.map((sneaker) => {
            <div key={sneaker.id}>
              <Image
                src={sneaker.image}
                alt={sneaker.name}
                width={100}
                height={100}
              />

              <span>{sneaker.name}</span>
              <span>{sneaker.category}</span>
              <span>{sneaker.price}</span>
              <span>{sneaker.size}</span>
            </div>;

            <div className="flex items-start gap-2">
              <button>
                {sneaker.quantity > 1 ? (
                  <button>
                    <MinusCircleIcon className="h-5 w-5 text-gray-500" />
                  </button>
                ) : (
                  <TrashIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <span>{sneaker.quantity}</span>
              <button onClick={() => sneaker.quantity + 1}>
                <PlusCircleIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>;
          })}
        </div>
      </div>

      {/* Summary details */}
      <div>
        <h1>Summary</h1>
      </div>
    </div>
  );
}
