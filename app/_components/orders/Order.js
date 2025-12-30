"use client";

import ReviewComponent from "@/app/_components/Review/ReviewComponent";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatDate } from "../../../utils/helpers";

export default function Order({ orders, reviews }) {
  const [openOrderId, setOpenOrderId] = useState(null);
  const [reviewItem, setReviewItem] = useState(null);

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500">
        No orders found. You have no orders yet!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-md p-6 space-y-6">
          {/* ===== Order header ===== */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-green-600">
                Order delivered
              </p>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-500">
                {formatDate(order.created_at)}
              </p>
            </div>

            <button
              onClick={() =>
                setOpenOrderId(openOrderId === order.id ? null : order.id)
              }
              className="text-sm text-primary-600 hover:underline"
            >
              {openOrderId === order.id ? "Hide details" : "Show details"}
            </button>
          </div>

          {/* ===== Order details ===== */}
          {openOrderId === order.id && (
            <>
              {/* Delivery info */}
              <div className="border-t pt-4 space-y-2">
                <p className="text-sm font-medium">Delivery address</p>
                <p className="text-sm text-gray-600">
                  Rua das flores 123,2008 <br />
                  São Paulo/SP – 02345-001
                </p>
                <button className="text-sm text-primary-600 hover:underline">
                  Shipping details
                </button>
              </div>

              {/* Main layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                {/* ===== LEFT: Products ===== */}
                <div className="md:col-span-2 space-y-6">
                  {order.order_items.map((item) => {
                    const userReview = reviews.find(
                      (r) => r.sneaker_id == item.sneaker_id
                    );
                    return (
                      <div key={item.id} className="flex gap-6 items-start">
                        <Link href={`/sneaker/${item.sneaker_id}`}>
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            width={120}
                            height={80}
                            className="rounded-md bg-gray-100"
                          />
                        </Link>

                        <div className="space-y-2">
                          <p className="font-medium">{item.name}</p>

                          <p className="text-sm text-gray-600">
                            Price: ${item.price}
                          </p>
                          <p className="text-sm text-gray-600">
                            Size: {item.size}
                          </p>

                          <p className="text-sm text-gray-600">
                            Color: {item.colors[0]}
                          </p>

                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>

                          <button
                            onClick={() => setReviewItem(item)}
                            className="mt-2 text-sm font-medium text-primary-600 hover:underline"
                          >
                            {userReview ? "Update your review" : "Rate product"}
                          </button>

                          {reviewItem?.id === item.id && (
                            <ReviewComponent
                              item={item}
                              review={userReview}
                              onClose={() => setReviewItem(null)}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ===== RIGHT: Order summary ===== */}
                <div className="border rounded-md p-4 bg-gray-50 space-y-3 h-fit">
                  <h3 className="text-sm font-medium">Order details</h3>

                  <div className="flex justify-between text-sm">
                    <span>Date</span>
                    <span>{formatDate(order.created_at)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Items ({order.order_items.length})</span>
                    <span>${order.total_price}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total_price}</span>
                  </div>
                </div>
              </div>

              {/* ===== Help section ===== */}
              <div className="border-t pt-6 text-sm space-y-2">
                <p className="font-medium">Need help?</p>
                <div className="flex gap-4 text-primary-600">
                  <button className="hover:underline">Contact us</button>
                  <button className="hover:underline">Return policy</button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
