"use client";

import ReviewComponent from "@/app/_components/ui/Review/ReviewComponent";
import { formatDate } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Order({ orders, reviews }) {
  const [openOrderId, setOpenOrderId] = useState(null);
  const [reviewItem, setReviewItem] = useState(null);
  const [reviewsState, setReviewsState] = useState(reviews);

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
        No orders found. You have no orders yet!
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => {
        const shippingAddress = order.order_addresses?.find(
          (a) => a.type === "shipping",
        );

        return (
          <div
            key={order.id}
            className="rounded-lg border bg-white p-6 sm:p-8 space-y-6"
          >
            {/* ===== Order header ===== */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-green-600">
                  Order delivered
                </p>
                <p className="text-sm text-gray-600">
                  Order ID{" "}
                  <span className="font-medium text-gray-700">{order.id}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(order.created_at)}
                </p>
              </div>

              <button
                onClick={() =>
                  setOpenOrderId(openOrderId === order.id ? null : order.id)
                }
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                {openOrderId === order.id ? "Hide details" : "Show details"}
              </button>
            </div>

            {/* ===== Order details ===== */}
            {openOrderId === order.id && (
              <>
                {/* Delivery info */}
                <div className="border-t pt-5 space-y-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Delivery address
                  </p>

                  {shippingAddress ? (
                    <p className="text-sm leading-relaxed text-gray-600">
                      {shippingAddress.street}, {shippingAddress.number}
                      {shippingAddress.complement &&
                        `, ${shippingAddress.complement}`}
                      <br />
                      {shippingAddress.city}/{shippingAddress.state} –{" "}
                      {shippingAddress.postal_code}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Shipping address not available
                    </p>
                  )}
                </div>

                {/* Main layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-6">
                  {/* ===== LEFT: Products ===== */}
                  <div className="md:col-span-2 space-y-8">
                    {order.order_items.map((item) => {
                      const userReview = reviewsState.find(
                        (r) => r.product_id == item.product_id,
                      );

                      return (
                        <div
                          key={item.id}
                          className="flex gap-6 items-start rounded-lg border p-4 sm:p-5"
                        >
                          <Link href={`/sneaker/${item.product_id}`}>
                            <Image
                              src={item.image[0]}
                              alt={item.name}
                              width={120}
                              height={80}
                              className="rounded-md bg-gray-100"
                            />
                          </Link>

                          <div className="space-y-2">
                            <p className="text-base font-semibold text-gray-900">
                              {item.name}
                            </p>

                            <div className="space-y-1 text-sm text-gray-600">
                              <p>Price: ${item.price}</p>
                              <p>Size: {item.size}</p>
                              <p>Color: {item.colors[0]}</p>
                              <p>Quantity: {item.quantity}</p>
                            </div>

                            <button
                              onClick={() => setReviewItem(item)}
                              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-600 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              ⭐{" "}
                              {userReview
                                ? "Update your review"
                                : "Rate this product"}
                            </button>

                            {reviewItem?.id === item.id && (
                              <ReviewComponent
                                item={item}
                                review={userReview}
                                onClose={() => setReviewItem(null)}
                                onSuccess={(newReview) => {
                                  setReviewsState((prev) => {
                                    const exists = prev.find(
                                      (r) =>
                                        r.product_id === newReview.product_id,
                                    );

                                    if (exists) {
                                      return prev.map((r) =>
                                        r.product_id === newReview.product_id
                                          ? newReview
                                          : r,
                                      );
                                    }

                                    return [...prev, newReview];
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ===== RIGHT: Order summary ===== */}
                  <div className="h-fit rounded-lg border bg-gray-50 p-5 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Order summary
                    </h3>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Date</span>
                      <span>{formatDate(order.created_at)}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Items ({order.order_items.length})</span>
                      <span>${order.total_price}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>

                    <div className="border-t pt-3 flex justify-between text-base font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${order.total_price}</span>
                    </div>
                  </div>
                </div>

                {/* ===== Help section ===== */}
                <div className="border-t pt-6 space-y-2 text-sm">
                  <p className="font-semibold text-gray-800">Need help?</p>
                  <div className="flex gap-6 text-primary-600">
                    <button className="hover:underline">Contact us</button>
                    <button className="hover:underline">Return policy</button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
