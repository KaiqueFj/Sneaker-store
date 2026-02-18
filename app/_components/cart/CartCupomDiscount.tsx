import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import { useCheckout } from "@/context/checkoutContext";
import { useCoupon } from "@/hooks/useCupom";
import { useState } from "react";

export default function CartCupomDiscount() {
  const { dispatch } = useCheckout();
  const [couponInput, setCouponInput] = useState("");

  function handleSubmit(formData: FormData) {
    applyCoupon(formData);
  }

  const { applyCoupon, status, loading } = useCoupon((data) => {
    dispatch({
      type: "SET_CUPOM",
      payload: {
        code: couponInput,
        value: data.value,
      },
    });
  });

  return (
    <div className="mt-8 flex flex-col gap-4 bg-white rounded-lg  p-6">
      <div>
        <h2 className="text-xl font-semibold text-primary-600 mb-1">
          Código Promocional
        </h2>
        <p className="text-sm text-primary-400">
          Digite seu código promocional para obter desconto
        </p>
      </div>
      <Form action={handleSubmit}>
        <Form.Field>
          <Form.InputWrapper>
            <Form.Input
              type="text"
              name="coupon"
              value={couponInput}
              placeholder="Cupom (`NIKE10`)"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCouponInput(e.target.value)
              }
              className="pr-20"
            />
            <Form.Actions className="absolute right-2 top-2.5 -translate-y-1/2">
              <Button pendingLabel="Aplicando" size="md" disabled={loading}>
                Aplicar
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
