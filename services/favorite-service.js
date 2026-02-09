"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createFavorite(sneakerId) {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("favorites").insert({
    sneaker_id: sneakerId,
    client_id: session.user.userId,
  });

  if (error) {
    throw new Error("Could not add favorite");
  }

  revalidatePath("/favorites");
  revalidatePath("/");
}

export async function removeFavorite(sneakerId) {
  const session = await auth();

  await supabase
    .from("favorites")
    .delete()
    .eq("client_id", session.user.userId)
    .eq("sneaker_id", sneakerId);

  revalidatePath("/favorites");
  revalidatePath("/");
}

export async function getFavorites() {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
        id,
        created_at,
        sneakers (
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

  return data.map((f) => ({
    ...f.sneakers,
    isFavorite: true,
    favoriteId: f.id,
  }));
}
