"use client";

import { AddressModal } from "@/app/_components/account/Adresses/AdressModal";
import Button from "@/app/_components/ui/Button/Button";
import { useCheckout } from "@/context/checkoutContext";
import { formatCurrency } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutComponent({ addresses }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { state: checkout, dispatch } = useCheckout();

  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const defaultAddress = addresses?.find((a) => a.is_default) ?? addresses?.[0];

  useEffect(() => {
    if (defaultAddress && !checkout.address) {
      dispatch({
        type: "SET_ADDRESS",
        payload: defaultAddress,
      });
    }
  }, [defaultAddress, checkout.address]);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {/* IDENTIFICATION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold">Identification</h1>

        {session?.user && (
          <div className="grid gap-4 rounded-xl border bg-white p-6">
            <InfoRow label="Name" value={session.user.name} />
            <InfoRow label="CPF" value="***.***.***-30" />
            <InfoRow label="E-mail" value={session.user.email} />
          </div>
        )}
      </section>

      {/* SHIPPING ADDRESS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-medium">Shipping address</h2>

        {defaultAddress ? (
          <div className="rounded-xl border bg-white p-6 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Default address</p>
              <p className="font-medium">
                {defaultAddress.street}, {defaultAddress.number}
                {defaultAddress.complement
                  ? `, ${defaultAddress.complement}`
                  : ""}
              </p>
              <p className="text-sm text-gray-600">
                {defaultAddress.city}, {defaultAddress.state}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                size="sm"
                onClick={() => {
                  setSelectedAddress(defaultAddress);
                  setOpen(true);
                }}
              >
                Edit address
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedAddress(null);
                  setOpen(true);
                }}
              >
                Add new address
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-6 space-y-3">
            <p className="font-medium">No address found</p>
            <p className="text-sm text-gray-600">
              Add a shipping address to continue checkout
            </p>

            <Button
              size="sm"
              onClick={() => {
                setSelectedAddress(null);
                setOpen(true);
              }}
            >
              Add new address
            </Button>
          </div>
        )}

        {open && (
          <AddressModal
            open={open}
            setOpen={setOpen}
            adress={selectedAddress}
          />
        )}
      </section>

      {/* SHIPPING METHOD */}
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
                      dispatch({ type: "SET_SHIPPING", payload: option })
                    }
                    className="mt-1"
                  />

                  <div className="space-y-1">
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

      {/* CONTINUE */}
      <section className="pt-4">
        <Button
          size="lg"
          className="w-full"
          disabled={!checkout.shipping}
          onClick={() => router.push("/checkout/payment")}
        >
          Continue to payment
        </Button>
      </section>
    </div>
  );
}

/* Small helper for consistent rows */
function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
