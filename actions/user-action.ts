"use server";

import { auth } from "@/lib/auth";
import sendMail from "@/lib/mailer";
import { supabase } from "@/lib/supabase";
import {
  createUser,
  getUser,
  getUserByHashedToken,
} from "@/services/users-service";
import { createResetToken } from "@/utils/helpers";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { signIn, signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

type User = {
  id: string;
  name: string;
  email: string;
  provider: string;
  created_at: string;
  updated_at: string;
};

export async function signUpNewUserAction(
  formData: FormData,
): Promise<{ message: string }> {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existingUser = await getUser(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await createUser({
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
    });

    return {
      message: "Account created successfully",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. Please try again.");
  }
}

export async function signInAction(): Promise<void> {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

export async function updateUserProfile(
  formData: FormData,
): Promise<{ message: string; ok: boolean }> {
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
    return { message: "Profile updated successfully", ok: true };
  } catch (error) {
    throw new Error("Something went wrong. Please try again.");
  }
}

export async function sendResetPasswordlinkToEmail(
  formData: FormData,
): Promise<{ message: string }> {
  try {
    const email = formData.get("email");

    const { data: user } = await supabase
      .from("users")
      .select("id, email, provider")
      .eq("email", email)
      .maybeSingle();

    if (!user || user.provider === "google") {
      return {
        message: "If an account exists with this email, a reset link was sent.",
      };
    }

    const { hashedToken, rawToken } = createResetToken();
    const resetUrl = `${process.env.NEXTAUTH_URL.replace(/\/$/, "")}/password-reset/${rawToken}`;

    const { error } = await supabase
      .from("users")
      .update({
        reset_token_hash: hashedToken,
        reset_token_expires_at: new Date(Date.now() + 10 * 60 * 1000),
      })
      .eq("id", user.id);

    if (error) {
      throw new Error("Something went wrong. Please try again later.");
    }

    await sendMail(user.email, resetUrl);

    return {
      message: "If an account exists with this email, a reset link was sent.",
    };
  } catch (err) {
    throw new Error("Something went wrong. Please try again later.");
  }
}

export async function resetPassword(
  formData: FormData,
): Promise<{ message: string }> {
  const password = formData.get("password")?.toString();
  const confirm = formData.get("confirmPassword")?.toString();
  const token = formData.get("token")?.toString();

  if (!password || !confirm || !token) {
    throw new Error("Invalid request");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (password !== confirm) {
    throw new Error("Passwords do not match");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await getUserByHashedToken(hashedToken);

  if (!user) {
    throw new Error("Invalid or expired token");
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
      throw new Error("Something went wrong. Please try again.");
    }

    return { message: "Password updated successfully" };
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
}

export async function updateUserPassword(
  formData: FormData,
): Promise<{ message: string }> {
  const session = await auth();
  const NewPassword = formData.get("New-password").toString();
  const ReenterPassword = formData.get("Reenter-password").toString();

  if (!NewPassword || !ReenterPassword) {
    throw new Error("Passwords are required");
  }

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  if (NewPassword.length <= 8 || ReenterPassword.length <= 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (NewPassword !== ReenterPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(NewPassword, 12);

  try {
    const { error } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
      })
      .eq("id", session.user.userId);

    if (error) {
      throw new Error("Something went wrong. Please try again.");
    }

    return { message: "Password updated successfully" };
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
}
