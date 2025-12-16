"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { createUser, getUser } from "./data-service";

export async function signUpNewUserAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const existingUser = await getUser(email);
  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await createUser({
    name,
    email,
    password: hashedPassword,
    provider: "credentials",
  });

  return { success: true };
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateUserProfile(formData) {
  const session = await auth();

  const client_id = session.user.userId;

  if (!session) throw new Error("You must be logged in ");

  const email = formData.get("email");
  const name = formData.get("name");
  const birthday = formData.get("birthday");

  const updateData = { email, name, birthday };

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", client_id);

  if (error) throw new Error("User could not be updated");

  revalidatePath("/account/profile");
  return data;
}
