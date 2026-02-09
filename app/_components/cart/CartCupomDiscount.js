import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import { useCheckout } from "@/context/checkoutContext";
import { useCoupon } from "@/hooks/useCupom";
import { useState } from "react";

export default function CartCupomDiscount() {
  const { dispatch } = useCheckout();
  const [couponInput, setCouponInput] = useState("");

  const { applyCoupon, status, loading, resetStatus } = useCoupon((data) => {
    dispatch({
      type: "SET_CUPOM",
      payload: {
        code: couponInput,
        value: data.value,
      },
    });
  });

  function handleSubmit(formData) {
    applyCoupon(formData);
  }

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
              placeholder="Coupon (`NIKE10`)"
              onChange={(e) => setCouponInput(e.target.value)}
              className="pr-20"
            />
            <Form.Actions className="absolute right-2 top-2.5 -translate-y-1/2">
              <Button pendingLabel="Applying" size="md" disabled={loading}>
                Apply
              </Button>
            </Form.Actions>
          </Form.InputWrapper>
        </Form.Field>

        {status && (
          <span
            className={
              status.type === "success"
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {status.message}
          </span>
        )}
      </Form>
    </div>
  );
}
