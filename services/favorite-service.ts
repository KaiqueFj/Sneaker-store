"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { FavoriteProduct } from "@/types/favorite";
import { revalidatePath } from "next/cache";

export async function createFavorite(sneakerId: string): Promise<void> {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("favorites").insert({
    product_id: sneakerId,
    client_id: session.user.userId,
  });

  if (error) {
    throw new Error("Could not add favorite");
  }

  revalidatePath("/favorites");
  revalidatePath("/");
}

export async function removeFavorite(sneakerId: string): Promise<void> {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("client_id", session.user.userId)
    .eq("product_id", sneakerId);

  if (error) {
    throw new Error("Could not remove favorite");
  }

  revalidatePath("/favorites");
  revalidatePath("/");
}

export async function getFavorites(): Promise<FavoriteProduct[]> {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
        id,
        products (
          id,
          name,
          price,
          category,
          images,
          sizes,
          colors,
          gender,
          model,
          rating_avg,
          rating_count
        )
      `,
    )
    .eq("client_id", session.user.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [];

  return data
    .map((f) => {
      const product = Array.isArray(f.products) ? f.products[0] : f.products;

      if (!product) return null;

      return {
        ...product,
        isFavorite: true,
        favoriteId: f.id,
      } satisfies FavoriteProduct;
    })
    .filter(Boolean);
}
