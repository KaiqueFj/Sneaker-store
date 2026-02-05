"use client";

import Button from "@/app/_components/ui/Button/Button";
import { useCheckout } from "@/context/checkoutContext";
import { formatCurrency } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CheckoutComponent({ addresses }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { state: checkout, dispatch } = useCheckout();

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6">
      {/* IDENTIFICATION */}
      <section className="border-b pb-3">
        <h1 className="text-3xl font-semibold mb-5">Identification</h1>

        <h2 className="text-xl font-medium mb-3">Personal information</h2>

        {session?.user && (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{session.user.name}</p>
            </div>

            <div>
              <p className="text-gray-500">CPF</p>
              <p className="font-medium">***.***.***-30</p>
            </div>

            <div>
              <p className="text-gray-500">E-mail</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
          </div>
        )}
      </section>

      {/* SHIPPING ADDRESS */}
      <section className="border-b pb-3">
        <h2 className="text-2xl font-medium mb-4">Shipping address</h2>

        {addresses.map((address) => {
          const isSelected = checkout.address?.id === address.id;

          return (
            <label
              key={address.id}
              className={`flex items-start gap-3 cursor-pointer rounded-lg border p-4 mb-3
              ${isSelected ? "border-black bg-gray-50" : "hover:border-gray-300"}
            `}
            >
              <input
                type="radio"
                checked={isSelected}
                onChange={() =>
                  dispatch({ type: "SET_ADDRESS", payload: address })
                }
                className="mt-1"
              />

              <div>
                <p className="font-medium">{address.label}</p>
                <p className="text-sm text-gray-600">
                  {address.street}, nº {address.number}
                </p>
              </div>
            </label>
          );
        })}

        <button className="mt-4 text-sm font-medium text-primary-600">
          + Add new address
        </button>
      </section>

      {/* Shipping options */}
      <section>
        <h2 className="text-2xl font-medium mb-4">Shipping method</h2>

        {checkout.shippingOptions?.length ? (
          <div className="flex flex-col gap-3">
            {checkout.shippingOptions.map((option) => {
              const isSelected = checkout.shipping?.type === option.type;

              return (
                <label
                  key={option.type}
                  className={`flex items-start gap-3 cursor-pointer rounded-lg border p-4 transition
              ${
                isSelected ? "border-black bg-gray-50" : "hover:border-gray-400"
              }
            `}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={isSelected}
                    onChange={() =>
                      dispatch({ type: "SET_SHIPPING", payload: option })
                    }
                    className="mt-1"
                  />

                  <div>
                    <p className="font-medium">
                      {option.type} —{" "}
                      {option.price === 0
                        ? "Free"
                        : formatCurrency(option.price)}
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

      {/* Forward */}
      <section>
        <Button
          onClick={() => router.push("/checkout/payment")}
          disabled={!checkout.shipping}
          className="w-full"
          variant="primary"
          size="lg"
        >
          Continue
        </Button>
      </section>
    </div>
  );
}
