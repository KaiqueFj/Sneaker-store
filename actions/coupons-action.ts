"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { CouponDiscount } from "@/types/coupom";

export async function getCouponDiscount(
  formData: FormData,
): Promise<{ success: boolean; data?: CouponDiscount; message: string }> {
  const coupon = formData.get("coupon");

  if (!coupon) {
    return {
      success: false,
      message: "Coupon is required",
    };
  }

  try {
    const { data, error } = await supabaseServer
      .from("coupons")
      .select("value, code")
      .eq("code", coupon)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: "Coupon is invalid or expired",
      };
    }

    return {
      success: true,
      data: { value: data.value, code: data.code },
      message: "Coupon applied successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "Unexpected error. Try again later.",
    };
  }
}
