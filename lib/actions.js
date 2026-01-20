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

  if (!session) {
    return {
      ok: false,
      message: "You must be logged in to update your profile",
    };
  }

  const email = formData.get("email");
  const name = formData.get("name");
  const birthday = formData.get("birthday");

  const updateData = { email, name, birthday };

  try {
    const { error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", client_id);

    revalidatePath("/account/profile");
    return { ok: true, message: "Profile updated successfully" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
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

export async function sendResetPasswordEmail(formData) {
  const email = formData.get("email");

  if (!email) {
    return {
      ok: false,
      message: "Email is required",
    };
  }

  try {
    const { data: user } = await supabase
      .from("users")
      .select("id, email, provider")
      .eq("email", email)
      .maybeSingle();

    if (!user || user.provider === "google") {
      return {
        ok: true,
        message: "If an account exists with this email, a reset link was sent.",
      };
    }

    const { hashedToken, rawToken } = createResetToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    const resetUrl = `${process.env.NEXTAUTH_URL}password-reset/${rawToken}`;

    const { error } = await supabase
      .from("users")
      .update({
        reset_token_hash: hashedToken,
        reset_token_expires_at: expiresAt,
      })
      .eq("id", user.id);

    if (!error) {
      await sendMail(user.email, resetUrl);
    }

    return {
      ok: true,
      message: "If an account exists with this email, a reset link was sent.",
    };
  } catch (error) {
    console.error("Reset password error:", error);

    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export const resetPassword = async (formData) => {
  const password = formData.get("password");
  const confirm = formData.get("confirmPassword");
  const token = formData.get("token");

  if (password.length < 8) {
    return {
      ok: false,
      message: "Password must be at least 8 characters",
    };
  }

  if (password !== confirm) {
    return { ok: false, message: "Passwords do not match" };
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await getUserByHashedToken(hashedToken);

  if (!user) {
    return { ok: false, message: "Invalid or expired token" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const { error } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
        reset_token_hash: null,
        reset_token_expires_at: null,
      })
      .eq("id", user.id);

    if (error) {
      return { ok: false, message: "Something went wrong. Please try again." };
    }

    return { ok: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Reset password error:", error);

    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};
