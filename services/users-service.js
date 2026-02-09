"use server";

import { supabase } from "@/lib/supabase";

export async function createUser(user) {
  const { data, error } = await supabase.from("users").insert([user]).single();

  if (error) {
    throw new Error("Could not create user");
  }

  return data;
}

export async function getUser(email) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  return data;
}

export async function getUserByHashedToken(token) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("reset_token_hash", token)
    .gt("reset_token_expires_at", now)
    .maybeSingle();

  if (error || !data) return null;

  return data;
}
