"use server";

import { supabase } from "@/lib/supabase";

type CouponDiscount = {
  value: number;
};

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
    const { data, error } = await supabase
      .from("coupons")
      .select("value")
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
      data,
      message: "Coupon applied successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Unexpected error. Try again later.",
    };
  }
}
