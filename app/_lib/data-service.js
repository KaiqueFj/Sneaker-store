import { supabase } from "./supabase";

export const getSneakers = async function (category) {
  const { data, error } = await supabase
    .from("sneakers")
    .select("id, name, colors, gender, sizes, price, images,category")
    .contains("category", [category])
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Sneakers could not be loaded");
  }

  return data;
};

export const getSneaker = async function (id) {
  const { data, error } = await supabase
    .from("sneakers")
    .select("id, name, colors, gender, sizes, price, images,category")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Sneakers could not be loaded");
  }

  return data;
};
