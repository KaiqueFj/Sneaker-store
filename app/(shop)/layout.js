"use client";

import CartItemList from "@/app/_components/cart/CartItemsList";
import { usePathname } from "next/navigation";

export default function ShopLayout({ children }) {
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <ol className="flex overflow-hidden rounded-md bg-gray-100">
          {/* STEP 1 */}
          <li className="relative flex flex-1 items-center bg-gray-300 px-6 py-4 text-gray-600">
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-xs font-semibold text-white">
              1
            </span>
            <span className="text-sm font-medium">Cart</span>

            {/* arrow */}
            <span className="absolute right-0 top-0 h-full w-6 bg-gray-300 after:absolute after:inset-0 after:bg-gray-300 after:[clip-path:polygon(0_0,100%_50%,0_100%)]" />
          </li>

          {/* STEP 2 */}
          <li className="relative flex flex-1 items-center bg-gray-300 px-6 py-4 text-gray-600">
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-xs font-semibold text-white">
              2
            </span>
            <span className="text-sm font-medium">Identification</span>

            {/* arrow */}
            <span className="absolute right-0 top-0 h-full w-6 bg-gray-300 after:absolute after:inset-0 after:bg-gray-300 after:[clip-path:polygon(0_0,100%_50%,0_100%)]" />
          </li>

          {/* STEP 3 – ACTIVE */}
          <li className="flex flex-1 items-center bg-white px-6 py-4 text-black">
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              3
            </span>
            <span className="text-sm font-medium">Payment</span>
          </li>
        </ol>
      </div>
      <div className="mt-8">
        {isCartPage ? (
          // Cart page: simple, single column
          <main>{children}</main>
        ) : (
          // Checkout pages: 3-column Nike layout
          <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-3">
              <CartItemList variant="compact" />
            </aside>

            <main className="col-span-6">{children}</main>

            <aside className="col-span-3">
              <p>Order Summary</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
