"use client";

import Button from "@/app/_components/Button/Button";
import Form from "@/app/_components/FormCompoundComponent/Form";

export default function CartCupomDiscount({}) {
  return (
    <div className="mt-8 flex flex-col gap-4 bg-white rounded-lg  p-6">
      <div>
        <h2 className="text-xl font-semibold text-primary-600 mb-1">
          Promo Code
        </h2>
        <p className="text-sm text-primary-400">
          Enter your promo code to get a discount
        </p>
      </div>
      <Form action={""}>
        <Form.Field>
          <Form.InputWrapper className="relative">
            <Form.Input type="text" className="pr-20" />
            <Form.Actions className="absolute right-2 top-2.5 -translate-y-1/2">
              <Button pendingLabel="Aplying..." size="md">
                Apply
              </Button>
            </Form.Actions>
          </Form.InputWrapper>
        </Form.Field>
      </Form>
    </div>
  );
}
