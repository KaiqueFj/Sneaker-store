"use client";

import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import { upsertUserAdress } from "@/lib/data-service";
import toast from "react-hot-toast";

export function AddressModal({ open, setOpen, adress }) {
  if (!open) return null;
  const isEditing = Boolean(adress);

  const {
    id,
    label,
    recipient_name,
    street,
    number,
    complement,
    city,
    state,
    postal_code,
    country,
    is_default,
  } = adress ?? {};

  async function handleSubmit(formData) {
    await toast.promise(upsertUserAdress(formData), {
      loading: "Saving address...",
      success: (data) => data.message,
      error: (err) => err.message,
    });

    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900">
              {isEditing ? "Edit address" : "Add new address"}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {isEditing
                ? "Update your address details below."
                : "Fill in the details to add a new address."}
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-neutral-400 hover:text-neutral-900"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <Form action={handleSubmit}>
          {isEditing && <input type="hidden" name="id" value={id} />}

          {/* Label */}
          <Form.Field>
            <Form.Label>Label</Form.Label>
            <Form.Input
              name="label"
              placeholder="Home, Work"
              type="text"
              defaultValue={label ?? ""}
            />
          </Form.Field>

          {/* Recipient */}
          <Form.Field>
            <Form.Label>Recipient name</Form.Label>
            <Form.Input
              name="recipient_name"
              type="text"
              defaultValue={recipient_name ?? ""}
            />
          </Form.Field>

          {/* Street + Number */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Field>
              <Form.Label>Street</Form.Label>
              <Form.Input
                name="street"
                type="text"
                defaultValue={street ?? ""}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Number</Form.Label>
              <Form.Input
                name="number"
                type="text"
                defaultValue={number ?? ""}
              />
            </Form.Field>
          </div>

          {/* Complement */}
          <Form.Field>
            <Form.Label>Complement (optional)</Form.Label>
            <Form.Input
              name="complement"
              type="text"
              defaultValue={complement ?? ""}
            />
          </Form.Field>

          {/* City / State */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Field>
              <Form.Label>City</Form.Label>
              <Form.Input name="city" type="text" defaultValue={city ?? ""} />
            </Form.Field>

            <Form.Field>
              <Form.Label>State</Form.Label>
              <Form.Input name="state" type="text" defaultValue={state ?? ""} />
            </Form.Field>
          </div>

          {/* Postal code / Country */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Field>
              <Form.Label>Postal code</Form.Label>
              <Form.Input
                name="postal_code"
                type="text"
                defaultValue={postal_code ?? ""}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Country</Form.Label>
              <Form.Input
                name="country"
                type="text"
                defaultValue={country ?? ""}
              />
            </Form.Field>
          </div>

          {/* Default address */}

          {/* Recipient */}
          <Form.Field>
            <Form.Label>Set as default address</Form.Label>
            <Form.InputWrapper>
              <Form.Input
                name="is_default"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
                defaultChecked={is_default ?? false}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <p>Set as default address</p>
              </div>
            </Form.InputWrapper>
          </Form.Field>

          {/* Actions */}
          <Form.Actions className="flex justify-end gap-3">
            <Button type="submit" size="lg">
              Save address
            </Button>
          </Form.Actions>
        </Form>
      </div>
    </div>
  );
}
