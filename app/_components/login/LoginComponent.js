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
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await toast.promise(
        (async () => {
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (result?.error) {
            throw new Error("Invalid email or password");
          }
          return result;
        })(),
        {
          loading: "Signing in...",
          success: () => {
            router.push("/account");
            return "Signed in successfully";
          },
          error: (err) => err.message,
        },
      );
    } catch {}
  }

  return (
    <div className="flex flex-col items-center px-4 mt-16 gap-8">
      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-semibold">Sign in to your account</h2>
        <p className="text-sm text-neutral-500">
          Welcome back! Please enter your details.
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-primary-600/10 shadow-sm">
        <Form action={handleSubmit} className="mt-6 p-6">
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Form.Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            ></Form.Input>
          </Form.Field>

          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Input
              name="password"
              type="password"
              placeholder="••••••••"
              required
            ></Form.Input>
          </Form.Field>

          {/* Actions */}
          <Form.Actions className="w-full">
            <Button className="w-full" pendingLabel="Signing in...">
              Sign in
            </Button>
          </Form.Actions>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200"></div>
            <span className="text-xs uppercase tracking-wide text-neutral-400">
              or
            </span>
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
      </div>
    </div>
  );
}
