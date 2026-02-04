"use client";

import CartItemList from "@/app/_components/cart/CartItemsList";
import CartSummary from "@/app/_components/cart/CartSummary";
import CheckoutComponent from "@/app/_components/cart/checkout/CheckoutComponent";
import CheckoutTransition from "@/app/_components/CheckoutTransition/CheckoutTransition";
import StepperHeader from "@/app/_components/StepperHeader/StepperHeader";
import { usePathname } from "next/navigation";

export default function ShopLayout({ children }) {
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";
  const isCheckoutPage = pathname === "/checkout";
  const isCheckoutPaymentPage = pathname === "/checkout/payment";

  return (
    <>
      <StepperHeader currentPath={pathname} />

      <div className="mt-8">
        {/* CART */}
        {isCartPage && (
          <main className="max-w-7xl mx-auto px-4">{children}</main>
        )}

        {/* CHECKOUT */}
        {isCheckoutPage && (
          <div className="max-w-7xl mx-auto w-full mt-10 px-4">
            <div className="grid grid-cols-12 gap-8">
              {/* LEFT – Cart items (desktop only) */}
              <aside className="hidden md:block md:col-span-3">
                <CartItemList variant="compact" />
              </aside>

              {/* CENTER – Checkout (always visible) */}
              <main className="col-span-12 md:col-span-6">
                <CheckoutTransition>{children}</CheckoutTransition>
              </main>
              {/* RIGHT – Summary (desktop only) */}
              <aside className="hidden md:block md:col-span-3 opacity-50">
                <CartSummary />
              </aside>
            </div>
          </div>
        )}

        {/* CHECKOUT / PAYMENT */}
        {isCheckoutPaymentPage && (
          <div className="max-w-7xl mx-auto w-full mt-10 px-4">
            <div className="grid grid-cols-12 gap-8">
              {/* LEFT – Cart items (desktop only) */}
              <aside className="hidden md:block md:col-span-3">
                <CartItemList variant="compact" />
              </aside>

              {/* CENTER – Checkout info (desktop only) */}
              <aside className="hidden md:block md:col-span-6 opacity-50">
                <CheckoutComponent />
              </aside>

              {/* RIGHT – Payment (always visible) */}
              <main className="col-span-12 md:col-span-3">
                {" "}
                <CheckoutTransition>{children}</CheckoutTransition>
              </main>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
