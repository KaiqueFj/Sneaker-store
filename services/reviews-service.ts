"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Review, ReviewInput, ReviewWithRelations } from "@/types/review";

export async function getSneakersReviews(
  sneakerId: string,
): Promise<ReviewWithRelations[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select(`*, products (rating_avg, rating_count), users (name)`)
    .eq("product_id", sneakerId);

  if (error) {
    throw new Error("Reviews could not be loaded");
  }

  return data ?? [];
}

export async function getUserReviews(userId: string): Promise<Review[]> {
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
export async function upsertReview({
  product_id,
  rating,
  comment,
}: ReviewInput): Promise<Review> {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .upsert(
        {
          product_id,
          client_id: session.user.userId,
          rating,
          comment,
        },
        { onConflict: "client_id,product_id" },
      )
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error("Review could not be created");
    }

    return data;
  } catch (error) {
    throw new Error("Review could not be created");
  }
}
