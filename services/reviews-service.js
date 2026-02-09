"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function getReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select(`*, sneakers (rating_avg, rating_count), users (name)`);

  if (error) {
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

export async function getSneakersReviews(sneakerId) {
  const { data, error } = await supabase
    .from("reviews")
    .select(`*, sneakers (rating_avg, rating_count), users (name)`)
    .eq("sneaker_id", sneakerId);

  if (error) {
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

export async function getUserReviews(userId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("client_id", userId);

  if (error) {
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

/* Upsert review (create or update) */
export async function upsertReview({ sneaker_id, rating, comment }) {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { data } = await supabase
    .from("reviews")
    .upsert(
      {
        sneaker_id,
        client_id: session.user.userId,
        rating,
        comment,
      },
      { onConflict: "client_id,sneaker_id" },
    )
    .select()
    .single();

  return data;
}
