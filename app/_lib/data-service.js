"use server";

import { auth } from "./auth";
import { supabase } from "./supabase";

export const getSneakers = async function (filterKey, filterValue) {
  let query = supabase
    .from("sneakers")
    .select("id, name, colors, gender, sizes, price, images, category, model")
    .order("name");

  if (filterKey && filterValue) {
    if (["gender", "category"].includes(filterKey)) {
      query = query.contains(filterKey, [filterValue]);
    } else {
      query = query.ilike(filterKey, `%${filterValue}%`);
    }
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Sneakers could not be loaded");
  }

  return data;
};

export const getSneaker = async function (id) {
  const { data, error } = await supabase
    .from("sneakers")
    .select("id, name, colors, gender, sizes, price, images, category, model")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Sneaker could not be loaded");
  }

  return data;
};

export const createOrder = async function ({ cartItems, total_price }) {
  const session = await auth();
  console.log("session:", session);

  if (!session?.user?.userId) throw new Error("User not authenticated");

  const client_id = session.user.userId;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ client_id, total_price })
    .select()
    .single();

  if (orderError) {
    throw new Error("Order could not be created");
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    sneaker_id: item.id,
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

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw new Error("Order items could not be created");
  }

  return order;
};

export const getOrders = async function (clientId) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
    id,
    client_id,
    created_at,
    order_items (*)
    , total_price
  `
    )
    .eq("client_id", clientId);

  return data;
};

export const getOrderItems = async function (orderId) {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (error) {
    throw new Error("Order items could not be loaded");
  }

  return data;
};

// Users
export const createUser = async function (user) {
  const { data, error } = await supabase.from("users").insert([user]).single();
  if (error) {
    throw new Error("User could not be created");
  }
  return data;
};

export const getUser = async function (email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
};
