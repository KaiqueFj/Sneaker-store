"use server";

import { CreateUserInput, DbUser, User } from "@/types/user";
import { supabase } from "../lib/supabase";

export async function createUser(user: CreateUserInput): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();

  if (error || !data) {
    throw new Error("Could not create user");
  }

  return data;
}

export async function getUser(email: string): Promise<User | null> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data ?? null;
}

export async function getUserForAuth(email: string): Promise<DbUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, password")
    .eq("email", email)
    .single();

  if (error) return null;

  return data;
}

export async function getUserByHashedToken(token: string) {
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
