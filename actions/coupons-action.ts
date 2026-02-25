'use server';

import { getCouponDiscountService } from '@/services/coupons-service';
import { CouponDiscount } from '@/types/coupon';

export async function getCouponDiscount(
  formData: FormData,
): Promise<{ success: boolean; data?: CouponDiscount; message: string }> {
  const rawCoupon = formData.get('coupon');

  if (!rawCoupon || typeof rawCoupon !== 'string') {
    return {
      success: false,
      message: 'Cupom inválido',
    };
  }

  const coupon = rawCoupon.trim();

  if (!coupon) {
    return {
      success: false,
      message: 'Informe um código de cupom',
    };
  }

  return getCouponDiscountService(coupon);
}
