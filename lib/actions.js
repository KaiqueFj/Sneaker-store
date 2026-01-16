"use server";

import sendMail from "@/lib/mailer";
import { createResetToken } from "@/utils/helpers";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { createUser, getUser } from "./data-service";
import { supabase } from "./supabase";

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

export const getUserByHashedToken = async (token) => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("reset_token_hash", token)
    .gt("reset_token_expires_at", now)
    .maybeSingle();

  if (error || !data) return null;

  return data;
};

export const forgotPassword = async function (prevState, formData) {
  const email = formData.get("email");

  if (!email) {
    return { error: "Email is required" };
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  const { hashedToken, rawToken } = createResetToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  const resetUrl = `${process.env.NEXTAUTH_URL}password-reset/${rawToken}`;

  if (!user) return;
  if (user.provider === "google") return;

  const { error: hashError } = await supabase
    .from("users")
    .update({
      reset_token_hash: hashedToken,
      reset_token_expires_at: expiresAt,
    })
    .eq("id", user.id);

  if (!hashError) {
    await sendMail(user.email, resetUrl);
  }
  return {
    status: "success",
    message: "If an account exists, a reset link was sent to your email.",
  };
};

export const resetPassword = async (formData) => {
  const password = formData.get("password");
  const confirm = formData.get("confirmPassword");
  const token = formData.get("token");

  console.log({ password, confirm, token });

  if (password.length < 8) {
    return {
      status: "error",
      message: "Password must be at least 8 characters",
    };
  }

  if (password !== confirm) {
    return { status: "error", message: "Passwords do not match" };
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await getUserByHashedToken(hashedToken);
  if (!user) {
    return { status: "error", message: "Invalid or expired token" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await supabase
    .from("users")
    .update({
      password: hashedPassword,
      reset_token_hash: null,
      reset_token_expires_at: null,
    })
    .eq("id", user.id);

  return { status: "success", message: "Password updated successfully" };
};
