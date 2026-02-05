"use client";

import { useCheckout } from "@/context/checkoutContext";
import { useEffect } from "react";

export default function CheckoutHydrator({ addresses }) {
  const { state, dispatch } = useCheckout();

  useEffect(() => {
    if (!addresses?.length) return;
    if (state.address || state.cep) return;

    const defaultAddress = addresses.find((a) => a.is_default) ?? addresses[0];

    dispatch({ type: "SET_ADDRESS", payload: defaultAddress });
    dispatch({
      type: "SET_CEP",
      payload: defaultAddress.postal_code,
    });
  }, [addresses, state.address, state.cep, dispatch]);

  return null;
}
