"use client";

import Button from "@/app/_components/Button/Button";
import Form from "@/app/_components/FormCompoundComponent/Form";
import ShippingOptions from "@/app/_components/ShippingOptions/ShippingOptions";
import { getShippingByCep } from "@/lib/actions";
import { formatCep } from "@/utils/helpers";
import { useState } from "react";

export default function CartShipping({ onShippingSelect }) {
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState(null);

  const handleCalculateShipping = async () => {
    const rawCep = cep.replace(/\D/g, "");
    if (rawCep.length !== 8) return;

    try {
      const result = await getShippingByCep(rawCep);
      setShipping(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-3 w-2/4">
      <span className="text-2xl font-medium">Shipping</span>
      <Form action={handleCalculateShipping}>
        <Form.Field>
          <Form.InputWrapper>
            <Form.Input
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
              maxLength={9}
            />
            <Form.Actions className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button size="md">Calculate</Button>
            </Form.Actions>
          </Form.InputWrapper>
        </Form.Field>
      </Form>
      {shipping && (
        <ShippingOptions shipping={shipping} onSelect={onShippingSelect} />
      )}
    </div>
  );
}
