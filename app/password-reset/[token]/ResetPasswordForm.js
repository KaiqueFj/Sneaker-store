"use client";

import { useState } from "react";
import { resetPassword } from "./actions";

export default function ResetPasswordForm({ token }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(formData) {
    setError("");
    setSuccess("");

    const password = formData.get("password");
    const confirm = formData.get("confirm");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const res = await resetPassword(token, password);

    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess("Password updated successfully. You can now log in.");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">New password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm password
        </label>
        <input
          type="password"
          name="confirm"
          required
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {success && <p className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-black/90 transition"
      >
        Reset password
      </button>
    </form>
  );
}
