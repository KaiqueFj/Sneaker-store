import { auth } from "@/lib/auth";
import { getUser } from "@/lib/data-service";
import crypto from "crypto";

export default async function page({ params }) {
  const { token } = await params;
  const sessionUser = await auth();
  const user = await getUser(sessionUser.user.email);
  let result = await crypto.createHash("sha256").update(token).digest("hex");

  console.log(token, result);

  return (
    // <div>
    //   {result !== user.reset_token_hash ? (
    //     <div>Invalid token</div>
    //   ) : (
    //     <div>Valid token</div>
    //   )}
    // </div>

    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <form
        class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-5"
        method="post"
        action=""
      >
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-semibold tracking-tight">Reset password</h1>
          <p class="mt-2 text-sm text-gray-500">
            Enter a new password for your account
          </p>
        </div>

        <div>
          <label
            for="password"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            New password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label
            for="confirmPassword"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <p class="text-xs text-gray-400">
          Password must be at least 8 characters long.
        </p>

        <button
          type="submit"
          class="mt-2 w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-black/90 active:scale-[0.98]"
        >
          Reset password
        </button>

        <div class="pt-4 text-center">
          <p class="text-xs text-gray-400">
            Remembered your password?
            <a href="/login" class="font-medium text-black hover:underline">
              Go back to login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
