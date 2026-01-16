"use client";

import Button from "@/app/_components/Button/Button";
import Logo from "@/app/_components/Header/logo/Logo";
import { forgotPassword } from "@/lib/actions";
import Link from "next/link";
import { useActionState } from "react";

const initialState = { status: null, message: "" };

export default function SendResetPasswordForm() {
  const [state, action] = useActionState(forgotPassword, initialState);

  const isError = state?.status === "error";

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-lg">
        {/* Optional brand / logo */}
        <div className="mb-10 flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">
            <Logo />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold leading-tight text-gray-900">
          Verify your email
          <br />
          to reset your password
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          We will send you an email with a link to reset your password.
        </p>

        {/* Form */}
        <form action={action} className="mt-8 space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs font-medium text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className={`w-full rounded-md border px-4 py-3 text-sm
                focus:outline-none transition
                ${
                  isError
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10"
                }`}
            />

            {isError && (
              <p className="text-xs text-red-600">
                Verify your email address and try again.
              </p>
            )}
          </div>

          {/* Server feedback */}
          {state?.message && (
            <p
              className={`text-sm ${
                state.status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {state.message}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/login"
              className="text-base text-primary-600 border-primary-600/20 border-2 px-8 py-3 rounded-full hover:border-primary-600 transition"
            >
              Cancel
            </Link>
            <Button pendingLabel="Sending..." className="font-medium">
              Send link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
