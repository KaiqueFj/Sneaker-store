"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { SneakerProvider } from "../context/SneakerContext";

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <SneakerProvider>
        <Toaster position="top-right" />
        {children}
      </SneakerProvider>
    </SessionProvider>
  );
}
