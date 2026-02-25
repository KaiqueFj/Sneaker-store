import { supabaseServer } from '@/lib/supabase-server';

export async function getCouponDiscount(coupon: string) {
  const { data, error } = await supabaseServer.from('coupons').select('value, code').eq('code', coupon).single();

  if (error || !data) {
    return {
      success: false,
      message: 'Código do cupom inválido ou expirado',
    };
  }

  return {
    success: true,
    data: { value: data.value, code: data.code },
    message: 'Código do cupom validado com sucesso',
  };
}
