"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  product_id: string;
  client_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

type ReviewWithRelations = Review & {
  products: {
    rating_avg: number;
    rating_count: number;
  } | null;
  users: {
    name: string;
  } | null;
};

type ReviewInput = {
  product_id: string;
  rating: string;
  comment: string;
};

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

  const { data } = await supabase
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

  return data;
}
