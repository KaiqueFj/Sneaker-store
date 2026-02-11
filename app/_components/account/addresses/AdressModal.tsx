"use client";

import { removeUserAddress, upsertUserAdress } from "@/actions/address-action";
import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import ModalTransition from "@/app/_components/ui/TransitionEffects/ModalTransition";
import { useCheckout } from "@/context/checkoutContext";
import toast from "react-hot-toast";

export function AddressModal({ open, setOpen, addresses }) {
  const { dispatch, state: addressInfo } = useCheckout();
  const isEditing = Boolean(addresses);

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
  } = addresses ?? {};

  async function handleSubmit(formData) {
    try {
      const result = await toast.promise(upsertUserAdress(formData), {
        loading: "Saving address...",
        success: (data) => data.message,
        error: (err) => err.message,
      });

      if (!result?.address) return;

      dispatch({
        type: "SET_ADDRESS",
        payload: result.address,
      });

      setOpen(false);
    } catch {}
  }

  async function handleDelete() {
    if (!id) return;

    try {
      await toast.promise(removeUserAddress(id), {
        loading: "Deleting address...",
        success: "Address deleted",
        error: (err) => err.message,
      });

      dispatch({ type: "REMOVE_ADDRESS" });

      setOpen(false);
    } catch {}
  }

  return (
    <ModalTransition open={open}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />

        {/* Modal */}
        <div className=" relative w-full max-w-lg max-h-[90vh] md:mx-4 rounded-xl bg-white shadow-xl flex flex-col">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between p-4">
            {" "}
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
              className="text-lg text-primary-50 hover:bg-black/70 bg-black rounded-full transition-all duration-200 w-8 h-8"
            >
              ✕
            </button>
          </div>
          {/* Form */}

          <div className="flex-1 overflow-y-auto px-6 pb-6">
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

              <Form.Field>
                <Form.Label>Street</Form.Label>
                <Form.Input
                  name="street"
                  type="text"
                  defaultValue={street ?? ""}
                />
              </Form.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/*  Number */}

                <Form.Field>
                  <Form.Label>Number</Form.Label>
                  <Form.Input
                    name="number"
                    type="text"
                    defaultValue={number ?? ""}
                  />
                </Form.Field>

                {/* Complement */}
                <Form.Field>
                  <Form.Label>Complement (optional)</Form.Label>
                  <Form.Input
                    name="complement"
                    type="text"
                    defaultValue={complement ?? ""}
                  />
                </Form.Field>
              </div>

              {/* City / State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Field>
                  <Form.Label>City</Form.Label>
                  <Form.Input
                    name="city"
                    type="text"
                    defaultValue={city ?? ""}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label>State</Form.Label>
                  <Form.Input
                    name="state"
                    type="text"
                    defaultValue={state ?? ""}
                  />
                </Form.Field>
              </div>

              {/* Postal code / Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <Form.Field>
                <label className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 px-4 py-3 cursor-pointer hover:border-neutral-400 transition">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-neutral-900">
                      Set as default address
                    </span>
                    <span className="text-xs text-neutral-500">
                      This address will be used by default at checkout
                    </span>
                  </div>

                  <input
                    name="is_default"
                    type="checkbox"
                    defaultChecked={is_default ?? false}
                    className="h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
                  />
                </label>
              </Form.Field>

              {/* Actions */}
              <Form.Actions className="flex justify-between gap-3">
                {isEditing ? (
                  <>
                    {/* Delete */}
                    <Button
                      type="button"
                      size="lg"
                      variant="secondary"
                      onClick={handleDelete}
                    >
                      Delete address
                    </Button>

                    {/* Save */}
                    <Button type="submit" size="lg" pendingLabel="Saving...">
                      Update address
                    </Button>
                  </>
                ) : (
                  <Button type="submit" size="lg" pendingLabel="Saving...">
                    Add address
                  </Button>
                )}
              </Form.Actions>
            </Form>
          </div>
        </div>
      </div>
    </ModalTransition>
  );
}
