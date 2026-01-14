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

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Reset password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter a new password for your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              New password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Helper text */}
          <p className="text-xs text-gray-400">
            Password must be at least 8 characters long.
          </p>

          {/* Button */}
          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-black/90 active:scale-[0.98]"
          >
            Reset password
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Remembered your password?{" "}
            <span className="cursor-pointer font-medium text-black hover:underline">
              Go back to login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
