"use client";

import { signUpNewUserAction } from "@/actions/user-action";
import SignInButton from "@/app/_components/auth/Login/SignInButton";
import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const metadata = { title: "Sign Up" };

export default function SignUpComponent() {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleHandlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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

            <Form.InputWrapper>
              <Form.Input
                type={isPasswordVisible ? "text" : "password"}
                className="pr-8"
                placeholder="••••••••"
                name="password"
                required
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <EyeIcon
                  onClick={toggleHandlePasswordVisibility}
                  className={`
                    w-6 h-6 absolute cursor-pointer
                    transition-all duration-200 ease-in-out
                    ${isPasswordVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                    text-neutral-400 hover:text-neutral-600`}
                />

                <EyeSlashIcon
                  onClick={toggleHandlePasswordVisibility}
                  className={`
                      w-6 h-6 cursor-pointer
                      transition-all duration-200 ease-in-out
                      ${isPasswordVisible ? "opacity-0 scale-90" : "opacity-100 scale-100"}
                      text-neutral-400 hover:text-neutral-600`}
                />
              </div>
            </Form.InputWrapper>
          </Form.Field>

          {/* Actions */}
          <Form.Actions className="w-full">
            <Button
              className="w-full"
              size="lg"
              variant="primary"
              pendingLabel="Creating..."
            >
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
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
