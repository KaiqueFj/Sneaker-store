"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { SneakerProvider } from "../context/SneakerContext";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <SneakerProvider>
        <Toaster position="top-right" />
        {children}
      </SneakerProvider>
    </SessionProvider>
  );
}
