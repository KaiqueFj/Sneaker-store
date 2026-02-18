"use client";

import ShippingOptions from "@/app/_components/shipping/ShippingOptions";
import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import { useCheckout } from "@/context/checkoutContext";
import { getShippingByCep } from "@/services/address-service";
import { formatCep } from "@/utils/helpers";
import { useEffect } from "react";

export default function CartShipping() {
  const { state, dispatch } = useCheckout();
  const cep = state.address?.postal_code ?? "";

  function handleCepChange(val: string) {
    const formattedCep = formatCep(val);
    dispatch({
      type: "SET_ADDRESS",
      payload: {
        ...state.address,
        postal_code: formattedCep,
      },
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleCalculateShipping() {
    const rawCep = cep.replace(/\D/g, "");
    if (rawCep.length !== 8) return;

    const { options, location } = await getShippingByCep(rawCep);

    dispatch({
      type: "SET_SHIPPING_OPTIONS",
      payload: options,
    });

    dispatch({
      type: "SET_ADDRESS",
      payload: {
        ...state.address,
        city: location.city,
        state: location.state,
      },
    });
  }

  useEffect(() => {
    if (cep && !state.shippingOptions.length) {
      handleCalculateShipping();
    }
  }, [cep, handleCalculateShipping, state.shippingOptions.length]);

  return (
    <div className="mt-8 flex flex-col gap-4 bg-white rounded-lg p-6">
      <div>
        <h2 className="text-xl font-semibold text-primary-600 mb-1">Frete</h2>
        <p className="text-sm text-primary-400">
          Digite seu CEP para calcular o frete
        </p>
      </div>

      <Form action={handleCalculateShipping}>
        <Form.Field>
          <Form.InputWrapper className="relative">
            <Form.Input
              type="text"
              placeholder="00000-000"
              value={formatCep(cep)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCepChange(formatCep(e.target.value))
              }
              maxLength={9}
              className="pr-20"
            />
            <Form.Actions className="absolute right-2 top-2.5 -translate-y-1/2">
              <Button pendingLabel="Calculando..." size="md">
                Calcular
              </Button>
            </Form.Actions>
          </Form.InputWrapper>
        </Form.Field>
      </Form>

      {state.shippingOptions.length > 0 && (
        <ShippingOptions shipping={state.shippingOptions} />
      )}
    </div>
  );
}
