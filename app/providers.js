"use client";

import { SessionProvider } from "next-auth/react";
import { SneakerProvider } from "./context/SneakerContext"; // adjust path
import { Toaster } from "react-hot-toast";
import React from "react";

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
