"use client";

import Button from "@/app/_components/Button/Button";
import Form from "@/app/_components/FormCompoundComponent/Form";
import { signUpNewUserAction } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SignInButton from "../login/SignInButton";

export const metadata = { title: "Sign Up" };

export default function SignUpComponent() {
  const router = useRouter();

  async function handleSubmit(formData) {
    try {
      await toast.promise(signUpNewUserAction(formData), {
        loading: "Creating account...",
        success: (data) => {
          router.push("/login");
          return data.message;
        },
        error: (err) => err.message,
      });
    } catch (error) {}
  }

  return (
    <div className="flex flex-col items-center px-4 mt-16 gap-8">
      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-semibold">Sign up to your account</h2>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-primary-600/10 shadow-sm">
        <Form action={handleSubmit} className="mt-6 p-6">
          <Form.Field>
            <Form.Label>Full name</Form.Label>
            <Form.Input
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </Form.Field>
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Form.Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </Form.Field>
          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Input
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </Form.Field>

          {/* Actions */}
          <Form.Actions className="w-full">
            <Button className="w-full" pendingLabel="Creating...">
              Create account
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
              {"Already have an account?"}
            </p>

            <Link
              href="/login"
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
