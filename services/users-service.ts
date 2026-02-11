"use server";

import { supabase } from "../lib/supabase";

type User = {
  id: string;
  name: string | null;
  email: string;
  provider: string;
  created_at: string;
};

type DbUser = {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
};

type CreateUserInput = {
  name?: string | null;
  email: string;
  password: string | null;
  provider: "credentials" | "google" | "github";
};

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

export async function getUser(email: string): Promise<DbUser | null> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data ?? null;
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
