"use client";

import { AddressModal } from "@/app/_components/account/addresses/AdressModal";
import { Address } from "@/types/shipping";
import { useState } from "react";

export default function AddressesClient({
  addresses,
}: {
  addresses: Address[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h2 className="mb-3 text-4xl font-bold tracking-tight text-neutral-900">
          Addresses
        </h2>
        <p className="text-sm text-neutral-500">
          Manage your saved addresses for a faster checkout experience.
        </p>
      </header>

      {/* List */}
      <section>
        <h3 className="mb-6 text-2xl font-semibold text-neutral-900">
          Your Addresses
        </h3>

        <div className="flex flex-col gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex items-start justify-between rounded-lg border border-neutral-200 p-4"
            >
              <div className="flex flex-col gap-1">
                {address.is_default && (
                  <span className="text-xs uppercase tracking-wide text-primary-600 font-bold">
                    Default address
                  </span>
                )}

                <span className="text-sm font-medium text-neutral-900">
                  {address.street}, nº {address.number}
                </span>

                <span className="text-sm text-neutral-600">
                  {address.city} / {address.state} — {address.postal_code}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedAddress(address);
                  setOpen(true);
                }}
                className="text-sm font-medium text-neutral-900 hover:underline"
              >
                Edit
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              setSelectedAddress(null);
              setOpen(true);
            }}
            className="mt-4 rounded-lg border border-dashed border-neutral-300 px-4 py-3 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
          >
            + Add new address
          </button>
        </div>
      </section>

      {open && (
        <AddressModal addresses={addresses} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
