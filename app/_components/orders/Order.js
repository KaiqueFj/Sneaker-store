"use client";

import Link from "next/link";
import { formatDate } from "../../utils/helpers";
import { useState } from "react";
import Image from "next/image";

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
                          <p>Subtotal: ${order.total_price}</p>
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

// const getStatusStyle = (status) => {
//   switch (status?.toLowerCase()) {
//     case "pending":
//       return "bg-yellow-100 text-yellow-700";
//     case "canceled":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-green-100 text-green-700"; // shipped or completed
//   }
// };

{
  /* <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border border-slate-200 text-sm text-left">
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-slate-200">Order ID</th>
              <th className="px-4 py-3 border-b border-slate-200">Date</th>
              <th className="px-4 py-3 border-b border-slate-200">Total</th>
              <th className="px-4 py-3 border-b border-slate-200">Status</th>
              <th className="px-4 py-3 border-b border-slate-200">Items</th>
              <th className="px-4 py-3 border-b border-slate-200 text-center">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id} className="bg-white hover:bg-slate-50">
                <td className="px-4 py-6 font-medium text-slate-700">
                  {order.id}
                </td>
                <td className="px-4 py-6 text-slate-500">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-4 py-6 font-semibold text-slate-700">
                  {order.total_price}
                </td>
                <td className="px-4 py-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status || "Shipped"}
                  </span>
                </td>
                <td className="px-4 py-6 text-slate-600">
                  {order.order_items?.length || 0}
                </td>
                <td className="px-4 py-6 text-center">
                  <Link
                    href={`/account/orders/item/${order.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex  items-center px-10 py-2 self-center  h-10 hover:bg-primary-600/10 border-2 border-primary-600/50 rounded-md transition">
        <Link
          href="/account"
          className="text-primary-600 hover:text-primary-800 font-medium "
        >
          Return
        </Link>
      </div> */
}
