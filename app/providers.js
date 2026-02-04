"use client";

import { CheckoutProvider } from "@/context/checkoutContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { SneakerProvider } from "../context/SneakerContext";

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <SneakerProvider>
        <CheckoutProvider>
          <Toaster position="top-right" />
          {children}
        </CheckoutProvider>
      </SneakerProvider>
    </SessionProvider>
  );
}
