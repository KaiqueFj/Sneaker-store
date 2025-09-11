import toast from "react-hot-toast";
import Category from "../_components/HeaderPages/Category";
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

export const createOrder = async function ({ client_id, cartItems }) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ client_id })
    .select()
    .single();

  if (orderError) {
    console.log(orderError);
    throw new Error("Order could not be created");
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    sneaker_id: item.id,
    quantity: item.quantity || 1,
    price: item.price,
    size: item.size,
    image: item.images,
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
    console.log(itemsError);
    throw new Error("Order items could not be created");
  }

  return order;
};
