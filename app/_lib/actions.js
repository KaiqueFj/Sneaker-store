"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateUserProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in ");

  const email = formData.get("email");

  const updateData = { email };

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", session.user.id);

  if (error) throw new Error("User could not be updated");

  revalidatePath("/account/profile");
  return data;
}
