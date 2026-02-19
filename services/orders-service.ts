"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { CreateOrderInput, Order } from "@/types/order";

export async function createOrder({
  cartItems,
  address,
  total_price,
}: CreateOrderInput): Promise<Order> {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const client_id = session.user.userId;

  const { data: order, error: orderError } = await supabaseServer
    .from("orders")
    .insert({ client_id, total_price })
    .select()
    .single();

  if (orderError) {
    throw new Error("Order could not be created");
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity || 1,
    price: item.price,
    size: item.size,
    image: [item.image],
    name: item.name,
    category: item.category,
    model: item.model,
    colors: item.colors,
    gender: item.gender,
  }));

  const { error: itemsError } = await supabaseServer
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw new Error("Order items could not be created");
  }

  const { error: addressError } = await supabaseServer
    .from("order_addresses")
    .insert({
      order_id: order.id,
      type: "shipping",
      recipient_name: address.recipient_name,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
    });

  if (addressError) {
    throw new Error("Order address could not be created");
  }

  return order;
}

export async function getOrders(clientId: string): Promise<Order[]> {
  const { data, error } = await supabaseServer
    .from("orders")
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
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Orders could not be loaded");
  }

  return data;
}
