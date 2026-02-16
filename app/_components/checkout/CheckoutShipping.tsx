"use client";

import { useCheckout } from "@/context/checkoutContext";
import { formatCurrency } from "@/utils/helpers";

export default function CheckoutShipping() {
  const { state: checkout, dispatch } = useCheckout();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-medium">Shipping method</h2>

      {checkout.shippingOptions?.length ? (
        <div className="space-y-3">
          {checkout.shippingOptions.map((option) => {
            const isSelected = checkout.shipping?.type === option.type;

            return (
              <label
                key={option.type}
                className={`flex items-start gap-4 rounded-xl border p-5 cursor-pointer transition
                  ${
                    isSelected
                      ? "border-black bg-gray-50"
                      : "hover:border-gray-400"
                  }
                `}
              >
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={() =>
                    dispatch({
                      type: "SET_SHIPPING",
                      payload: option,
                    })
                  }
                />

                <div>
                  <p className="font-medium">
                    {option.type} —{" "}
                    {option.price === 0 ? "Free" : formatCurrency(option.price)}
                  </p>

                  <p className="text-sm text-gray-600">
                    {option.days} business days
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Please calculate shipping in your cart
        </p>
      )}
    </section>
  );
}
