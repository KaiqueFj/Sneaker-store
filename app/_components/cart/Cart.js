"use client";

import CartCupomDiscount from "@/app/_components/cart/CartCupomDiscount";
import CartItemList from "@/app/_components/cart/CartItemsList";
import CartShipping from "@/app/_components/cart/cartShipping";
import CartSummary from "@/app/_components/cart/CartSummary";

export default function Cart() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-6 flex-1 w-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-primary-600 mb-2">
            Your Bag
          </h1>
          <p className="text-sm text-primary-400">
            Review and edit your items below
          </p>
        </div>

        <CartItemList editable />

        <div className="flex flex-col md:flex-row w-full justify-between">
          <CartShipping />
          <CartCupomDiscount />
        </div>
      </div>

      <div className="md:w-96 gap-4 md:sticky md:top-24 md:h-fit">
        <CartSummary />
      </div>
    </div>
  );
}
