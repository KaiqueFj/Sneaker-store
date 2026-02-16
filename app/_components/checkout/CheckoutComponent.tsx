"use client";

import { useCheckout } from "@/context/checkoutContext";
import { Address } from "@/types/shipping";
import { useEffect } from "react";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutContinue from "./CheckoutContinue";
import CheckoutIdentification from "./CheckoutIdentification";
import CheckoutShipping from "./CheckoutShipping";

export default function CheckoutComponent({
  addresses,
  variant = "default",
}: {
  addresses: Address[];
  variant?: "default" | "compact";
}) {
  const { state: checkout, dispatch } = useCheckout();

  const isCompact = variant === "compact";

  const defaultAddress = addresses?.find((a) => a.is_default) ?? addresses?.[0];

  const currentAddress = checkout.address ?? defaultAddress ?? null;

  // Auto hydrate context
  useEffect(() => {
    if (defaultAddress && !checkout.address) {
      dispatch({
        type: "SET_ADDRESS",
        payload: defaultAddress,
      });
    }
  }, [defaultAddress, checkout.address, dispatch]);

  return (
    <div
      className={`mx-auto ${
        isCompact ? "max-w-xl space-y-8" : "max-w-3xl space-y-10"
      }`}
    >
      {!isCompact && <CheckoutIdentification />}

      <CheckoutAddress address={currentAddress} variant={variant} />

      {!isCompact && <CheckoutShipping />}

      {!isCompact && <CheckoutContinue />}
    </div>
  );
}
