"use client";

import { useActionState } from "react";
import { forgotPassword } from "../../lib/actions";
import Button from "../_components/Button/Button";

const initialState = { status: null, message: "" };

export default function SendResetPasswordForm() {
  const [state, action] = useActionState(forgotPassword, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        action={action}
        className="w-full max-w-md rounded-2xl  backdrop-blur
                   p-8 shadow-md border border-primary-600/10 space-y-7 "
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Forgot password
          </h1>
          <p className="text-sm text-gray-500">
            We’ll email you a secure link to reset your password
          </p>
        </div>

        {/* Email input */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-xs font-medium uppercase tracking-widest text-gray-500"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300
                       bg-gray-50/50 px-4 py-2.5 text-sm
                       focus:border-black focus:outline-none
                       focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Feedback message */}
        {state?.message && (
          <div
            className={`rounded-lg px-4 py-3 text-sm ${
              state.status === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {state.message}
          </div>
        )}

        <div className="flex flex-row items-center justify-center">
          {/* Submit */}
          <Button pendingLabel="Sending..." className="w-full">
            Send reset link
          </Button>
        </div>

        {/* Footer */}
        <p className="pt-2 text-center text-xs text-gray-400">
          If an account exists, you’ll receive an email shortly.
        </p>
      </form>
    </div>
  );
}
