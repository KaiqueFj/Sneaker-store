import { getCouponDiscount } from '@/repository/coupons-repository';

export async function getCouponDiscountService(coupon: string) {
  return getCouponDiscount(coupon);
}
