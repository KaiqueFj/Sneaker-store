import { getCouponDiscount } from "@/actions/coupons-action";
import { useState } from "react";

export function useCoupon(onApply) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function applyCoupon(formData) {
    setLoading(true);

    const res = await getCouponDiscount(formData);

    if (!res.success) {
      setStatus({ type: "error", message: res.message });
      setLoading(false);
      return;
    }

    setStatus({
      type: "success",
      message: `Coupon applied! ${res.data.value}% off 🎉`,
    });

    onApply(res.data);
    setLoading(false);
  }

  return { applyCoupon, status, loading };
}
