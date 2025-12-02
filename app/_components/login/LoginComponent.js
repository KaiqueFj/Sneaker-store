import Link from "next/link";
import SignInButton from "./SignInButton";

export default function LoginComponent() {
  return (
    <div className="flex flex-col items-center px-4 mt-16 gap-8">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center">
        Sign in to your account
      </h2>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        {/* Email */}
        <form className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300
              text-neutral-800 shadow-sm transition-all
              focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300
              text-neutral-800 shadow-sm transition-all
              focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary-600 text-white font-medium
            hover:bg-primary-700 transition-all"
          >
            Sign In
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-neutral-200"></div>
          <span className="text-sm text-neutral-500">or</span>
          <div className="h-[1px] flex-1 bg-neutral-200"></div>
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
      </div>
    </div>
  );
}
