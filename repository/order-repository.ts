import { supabaseServer } from '@/lib/supabase-server';
import { CreateOrderInput, Order } from '@/types/order';

export async function createOrderWithTransaction(userId: string, input: CreateOrderInput): Promise<Order> {
  const normalizedItems = input.cartItems.map((item) => ({
    ...item,
    size: Number(item.size),
    image: Array.isArray(item.image) ? item.image : [item.image],
  }));

  const { data, error } = await supabaseServer.rpc('create_order_transaction', {
    p_client_id: userId,
    p_total_price: input.total_price,
    p_items: normalizedItems,
    p_address: input.address,
  });

  console.log(JSON.stringify(input.cartItems, null, 2));
  console.log('ADDRESS:', JSON.stringify(input.address, null, 2));

  if (error) {
    console.log(error);
    throw new Error('Não foi possível criar o pedido');
  }

  return data;
}

export async function getOrders(clientId: string): Promise<Order[]> {
  const { data, error } = await supabaseServer
    .from('orders')
    .select(
      `
        id,
        client_id,
        created_at,
        total_price,
        order_items (*),
        order_addresses (*)
      `,
    )
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Não foi possível carregar os pedidos');
  }

  return data;
}
