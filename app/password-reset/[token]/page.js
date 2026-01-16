import { resetPassword } from "@/lib/actions";
import Link from "next/link";

export default async function page({ params }) {
  // const [state, action] = useActionState(forgotPassword, initialState);

  const { token } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md space-y-5"
        action={resetPassword}
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Reset password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter a new password for your account
          </p>
        </div>

        <div>
          <label
            for="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            New password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
          />

          <input type="hidden" name="token" value={token} />
        </div>

        <div>
          <label
            for="confirmPassword"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <p className="text-xs text-gray-400">
          Password must be at least 8 characters long.
        </p>

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-black/90 active:scale-[0.98]"
        >
          Reset password
        </button>

        <div className="pt-4 items-center justify-center gap-2 flex flex-row text-center">
          <p className="text-xs text-gray-400">Remembered your password?</p>

          <Link
            href="/login"
            className=" text-xs font-medium text-black hover:underline"
          >
            Go back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
