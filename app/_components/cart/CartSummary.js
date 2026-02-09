"use client";

import Button from "@/app/_components/ui/Button/Button";
import { useCheckout } from "@/context/checkoutContext";
import { useSneaker } from "@/context/SneakerContext";
import { createOrder } from "@/services/orders-service";
import { formatCurrency } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartSummary() {
  const { state, dispatch } = useSneaker();
  const { state: checkout } = useCheckout();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const discountPercentage = checkout.cupom?.value ?? 0;
  const shippingPrice = checkout.shipping ? checkout.shipping.price : null;

  const isCheckoutPage =
    pathname.includes("/checkout/payment") || pathname.includes("/checkout");

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const total =
    subtotal + shippingPrice - (subtotal * discountPercentage) / 100;

  const discountValue =
    discountPercentage > 0 ? (subtotal * discountPercentage) / 100 : 0;

  const handleOrderBtn = async () => {
    // 1️⃣ Check authentication first
    if (!session?.user?.userId) {
      toast.error("You must log in first to place an order! Redirecting...");
      router.push("/login");
    }

    // 2️⃣ Continue with the normal order flow
    await toast.promise(
      createOrder({
        cartItems: state.items,
        total_price: total,
        address: checkout.address,
      }).then((order) => {
        dispatch({ type: "CLEAR_CART" });
        return order;
      }),
      {
        loading: "Saving your order...",
        success: "Order saved successfully!",
        error: "Order could not be done! Try again!",
      },
    );
  };
  return (
    <div className="bg-white border border-primary-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-primary-600 mb-5">
        Order Summary
      </h2>

      <div className="flex flex-col gap-3 py-4 border-t border-b border-primary-200">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-sm text-primary-400">Subtotal</span>
          <span className="font-medium text-primary-600">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-sm text-primary-400">Shipping</span>

          {checkout.shipping ? (
            <span className="font-medium text-primary-600">
              {checkout.shipping.price === 0
                ? "Free"
                : formatCurrency(checkout.shipping.price)}
            </span>
          ) : (
            <span className="text-sm text-primary-400">-</span>
          )}
        </div>

        {/* Coupon */}
        {checkout.cupom && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Coupon applied
              <span className="ml-1 font-medium uppercase">
                ({checkout.cupom.code ?? `${discountPercentage}% OFF`})
              </span>
            </span>
            <span className="font-medium">
              -{formatCurrency(discountValue)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 pt-1">
        <span className="text-base font-semibold text-primary-600">Total</span>
        <span className="text-2xl font-bold text-primary-600">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="mt-1 ">
        {isCheckoutPage && state.items.length > 0 ? (
          <Button
            onClick={() =>
              handleOrderBtn().then(() =>
                router.push("/account/orders/thankyou"),
              )
            }
            variant="primary"
            size="md"
            className="mt-4 w-full py-3.5"
            pendingLabel="Processing..."
          >
            Checkout
          </Button>
        ) : (
          <>
            <Button
              variant="primary"
              size="md"
              className="w-full mt-4 py-3.5"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="secondary"
              size="md"
              className="w-full mt-4 py-3.5"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
