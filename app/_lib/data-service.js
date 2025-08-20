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
      query = query.eq(filterKey, filterValue);
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
    console.error(error);
    throw new Error("Sneaker could not be loaded");
  }

  return data;
};
