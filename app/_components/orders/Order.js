"use client";

import Image from "next/image";
import { useState } from "react";
import { formatDate } from "../../../utils/helpers";

export default function Order({ orders }) {
  const [openOrderId, setOpenOrderId] = useState(null);

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500">
        No orders found. You have no orders yet !
      </div>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col border-2 gap-6 border-primary-600/70 rounded-md p-4"
        >
          {/* Sneaker infos */}
          <div className="flex flex-col  gap-4  px-1 py-4">
            <div className="flex flex-row justify-between">
              <p className="font-medium">Order ID: {order.id}</p>
              <p className="font-medium">{order.total_price}</p>
            </div>

            <p>{formatDate(order.created_at)}</p>
          </div>

          {/* Show/hide details for THIS order */}
          {openOrderId === order.id && (
            <div className="flex flex-col border-t-4 pt-4 border-primary-600/30 px-1">
              <ul className="flex gap-4 flex-col">
                {order.order_items.map((item) => (
                  <li className="flex leading-6 text-left w-full" key={item.id}>
                    <div>
                      <Image
                        src={item.image[0]}
                        alt="Sneaker"
                        width={150}
                        height={50}
                        className="rounded-md"
                      />
                    </div>

                    <div className="w-3/4 flex flex-col gap-2 ml-4">
                      <p className="font-medium">
                        {item.name || "Sneaker Name"}
                      </p>

                      <div className="flex flex-row justify-between">
                        <div className="text-sm font-normal text-primary-600/75">
                          <p>Color: {item.color || "black"}</p>
                          <p>Size: {item.size}</p>
                          <p>Category: {item.category}</p>
                        </div>

                        <div className="text-sm font-normal text-primary-600/75">
                          <p>Price: ${item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Subtotal: {order.total_price}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Toggle btn for THIS order */}
          <button
            onClick={() =>
              setOpenOrderId(openOrderId === order.id ? null : order.id)
            }
            className="mt-2 px-4 py-2 text-primary-text-600 hover:text-primary-600/50 underline transition"
          >
            {openOrderId === order.id ? "Hide Details" : "Show Details"}
          </button>
        </div>
      ))}
    </>
  );
}
