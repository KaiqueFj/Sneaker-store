import { getCouponDiscount } from "@/actions/coupons-action";
import { useState } from "react";

type CouponData = {
  value: number;
};

type CouponStatus =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export function useCoupon(onApply: (data: CouponData) => void) {
  const [status, setStatus] = useState<CouponStatus>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function applyCoupon(formData: FormData) {
    setLoading(true);

    const res = await getCouponDiscount(formData);

    if (!res.success) {
      setStatus({
        type: "error",
        message: res.message,
      });
      setLoading(false);
      return;
    }

    setStatus({
      type: "success",
      message: `Cupom aplicado! ${res.data.value}% off 🎉`,
    });

    onApply(res.data);
    setLoading(false);
  }

  return { applyCoupon, status, loading };
}
