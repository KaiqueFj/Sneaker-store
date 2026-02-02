"use client";

import CartItemList from "@/app/_components/cart/CartItemsList";
import CartShipping from "@/app/_components/cart/cartShipping";
import CartSummary from "@/app/_components/cart/CartSummary";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const [selectedShipping, setSelectedShipping] = useState(null);

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">Your Bag</h1>

        <CartItemList editable />

        <CartShipping onShippingSelect={setSelectedShipping} />
      </div>

      <div className="w-96">
        <CartSummary selectedShipping={selectedShipping} />

        <button
          onClick={() => router.push("/checkout")}
          className="mt-6 w-full bg-primary-600 text-white py-3 rounded-xl"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
