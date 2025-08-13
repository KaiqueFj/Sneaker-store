import { supabase } from "./supabase";

export const getSneakers = async function () {
  const { data, error } = await supabase
    .from("sneakers")
    .select("id, name, color, gender, sizes, price, images")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Sneakers could not be loaded");
  }

  return data;
};
