"use client";

import { useCheckout } from "@/context/checkoutContext";
import { Address } from "@/types/shipping";
import { useEffect } from "react";
import CartCupomDiscount from "./CartCupomDiscount";
import CartItemList from "./CartItemsList";
import CartShipping from "./cartShipping";
import CartSummary from "./CartSummary";

export default function Cart({ defaultAddress }: { defaultAddress: Address }) {
  const { state, dispatch } = useCheckout();

  useEffect(() => {
    if (defaultAddress && !state.address) {
      dispatch({
        type: "SET_ADDRESS",
        payload: defaultAddress,
      });
    }
  }, [defaultAddress, state.address, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-8 md:p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-6 px-3 flex-1">
        <CartItemList editable />

        <div className="flex flex-col md:flex-row gap-6">
          <CartShipping />
          <CartCupomDiscount />
        </div>
      </div>

      <div className="md:w-96 md:sticky md:top-24">
        <CartSummary />
      </div>
    </div>
  );
}
