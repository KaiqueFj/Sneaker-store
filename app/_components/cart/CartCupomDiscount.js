"use client";

import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import { useCheckout } from "@/context/checkoutContext";
import { getCouponDiscount } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function CartCupomDiscount() {
  const { state, dispatch } = useCheckout();
  const [couponInput, setCouponInput] = useState("");

  async function handleSubmit(formData) {
    try {
      const discount = await getCouponDiscount(formData);
      dispatch({
        type: "SET_CUPOM",
        payload: {
          code: formData.get("coupon"),
          value: discount.value,
        },
      });
    } catch (err) {}
  }

  useEffect(() => {
    if (state.cupom?.code) {
      setCouponInput(state.cupom.code);
    }
  }, [state.cupom]);

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
      <Form action={handleSubmit}>
        <Form.Field>
          <Form.InputWrapper className="relative">
            <Form.Input
              type="text"
              name="coupon"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="pr-20"
            />
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
