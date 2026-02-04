"use client";

import Button from "@/app/_components/Button/Button";
import Form from "@/app/_components/FormCompoundComponent/Form";
import ShippingOptions from "@/app/_components/ShippingOptions/ShippingOptions";
import { getShippingByCep } from "@/lib/actions";
import { formatCep } from "@/utils/helpers";
import { useState } from "react";

export default function CartShipping({}) {
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState(null);

  const handleCalculateShipping = async () => {
    const rawCep = cep.replace(/\D/g, "");
    if (rawCep.length !== 8) return;

    const result = await getShippingByCep(rawCep);
    setShipping(result);
  };

  return (
    <div className="mt-8 flex flex-col gap-4 bg-white rounded-lg  p-6">
      <div>
        <h2 className="text-xl font-semibold text-primary-600 mb-1">
          Shipping
        </h2>
        <p className="text-sm text-primary-400">
          Enter your postal code to calculate shipping
        </p>
      </div>
      <Form action={handleCalculateShipping}>
        <Form.Field>
          <Form.InputWrapper className="relative">
            <Form.Input
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
              maxLength={9}
              className="pr-20"
            />
            <Form.Actions className="absolute right-2 top-2.5 -translate-y-1/2">
              <Button pendingLabel="Calculating..." size="md">
                Calculate
              </Button>
            </Form.Actions>
          </Form.InputWrapper>
        </Form.Field>
      </Form>
      {shipping && <ShippingOptions shipping={shipping} />}
    </div>
  );
}
