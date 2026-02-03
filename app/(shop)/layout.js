"use client";

import CartItemList from "@/app/_components/cart/CartItemsList";
import CartSummary from "@/app/_components/cart/CartSummary";
import CheckoutComponent from "@/app/_components/cart/checkout/CheckoutComponent";
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
        {isCartPage && (
          // Cart page: simple, single column
          <main>{children}</main>
        )}

        {isCheckoutPage && (
          // Checkout pages: 3-column Nike layout
          <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-3">
              <CartItemList variant="compact" />
            </aside>
            <main className="col-span-6">{children}</main>

            <aside className="col-span-3 opacity-50">
              <CartSummary />
            </aside>
          </div>
        )}

        {isCheckoutPaymentPage && (
          // Checkout pages: 3-column Nike layout
          <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-3">
              <CartItemList variant="compact" />
            </aside>

            <aside className="col-span-3 opacity-50 ">
              <CheckoutComponent />
            </aside>
            <main className="col-span-6">{children}</main>
          </div>
        )}
      </div>
    </>
  );
}
