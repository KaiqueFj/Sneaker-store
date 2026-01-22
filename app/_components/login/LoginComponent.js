"use client";

import Button from "@/app/_components/Button/Button";
import Form from "@/app/_components/FormCompoundComponent/Form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SignInButton from "./SignInButton";

export default function LoginComponent() {
  const router = useRouter();

  async function handleSubmit(formData) {
    toast.dismiss();

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Welcome back!");
    router.push("/account");
  }

  return (
    <div className="flex flex-col items-center px-4 mt-16 gap-8">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center">
        Sign in to your account
      </h2>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md ">
        <Form action={handleSubmit} className="mt-8 space-y-6 p-4">
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Form.Input
              name="email"
              type="email"
              placeholder="you@example.com"
            ></Form.Input>
          </Form.Field>

          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Input
              name="password"
              type="password"
              placeholder="••••••••"
            ></Form.Input>
          </Form.Field>

          {/* Actions */}
          <Form.Actions className>
            <Button pendingLabel="Updating...">Sign in</Button>
          </Form.Actions>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200"></div>
            <span className="text-sm text-neutral-500">or</span>
            <div className="h-px flex-1 bg-neutral-200"></div>
          </div>
          {/* Google login button */}
          <div className="flex justify-center">
            <SignInButton />
          </div>

          {/* Link to signup */}
          <div className="flex flex-row gap-2 items-center justify-center">
            <p className="text-sm text-center text-neutral-600">
              {"Don't have an account?"}
            </p>

            <Link
              href="/signup"
              className="text-primary-600 text-sm hover:underline"
            >
              Sign up
            </Link>
          </div>
        </Form>
        {/* Email */}
      </div>
    </div>
  );
}
