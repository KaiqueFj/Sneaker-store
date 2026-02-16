"use client";

import { AddressModal } from "@/app/_components/account/addresses/AdressModal";
import Button from "@/app/_components/ui/Button/Button";
import { Address } from "@/types/shipping";
import { useState } from "react";

export default function CheckoutAddress({
  address,
  variant = "default",
}: {
  address: Address | null;
  variant?: "default" | "compact";
}) {
  const isCompact = variant === "compact";

  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  return (
    <section className={isCompact ? "space-y-3" : "space-y-4"}>
      {isCompact ? (
        <>
          <h1 className="text-2xl font-semibold">Address</h1>

          {address ? (
            <AddressCompact
              address={address}
              onEdit={() => {
                setSelectedAddress(address);
                setOpen(true);
              }}
              onAdd={() => {
                setSelectedAddress(null);
                setOpen(true);
              }}
            />
          ) : (
            <EmptyAddress onAdd={() => setOpen(true)} />
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-medium">Shipping address</h2>

          {address ? (
            <AddressCard
              address={address}
              onEdit={() => {
                setSelectedAddress(address);
                setOpen(true);
              }}
              onAdd={() => {
                setSelectedAddress(null);
                setOpen(true);
              }}
            />
          ) : (
            <EmptyAddress onAdd={() => setOpen(true)} />
          )}
        </>
      )}

      {open && (
        <AddressModal
          open={open}
          setOpen={setOpen}
          addresses={selectedAddress}
        />
      )}
    </section>
  );
}

function AddressCompact({ address, onEdit, onAdd }: any) {
  return (
    <div className="space-y-1 text-sm">
      <p>
        {address.street}, {address.number}
      </p>
      {address.complement && <p>{address.complement}</p>}
      <p>
        {address.city}, {address.state}
      </p>

      <div className="flex gap-4 pt-2">
        <button className="underline" onClick={onEdit}>
          Edit
        </button>
        <button className="underline" onClick={onAdd}>
          Add new
        </button>
      </div>
    </div>
  );
}

function AddressCard({ address, onEdit, onAdd }: any) {
  return (
    <div className="rounded-xl border bg-white p-6 space-y-3">
      <p className="font-medium">
        {address.street}, {address.number}
        {address.complement ? `, ${address.complement}` : ""}
      </p>

      <p className="text-sm text-gray-600">
        {address.city}, {address.state}
      </p>

      <div className="flex gap-3 pt-2">
        <Button size="sm" onClick={onEdit}>
          Edit address
        </Button>

        <Button variant="secondary" size="sm" onClick={onAdd}>
          Add new address
        </Button>
      </div>
    </div>
  );
}

function EmptyAddress({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-xl border bg-white p-6 space-y-3">
      <p className="font-medium">No address found</p>

      <Button size="sm" onClick={onAdd}>
        Add new address
      </Button>
    </div>
  );
}
