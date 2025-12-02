import Link from "next/link";

export const metadata = {
  title: "Sign Up",
};

export default function SignUpComponent() {
  return (
    <div className="flex flex-col items-center px-4 mt-16 gap-8">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center">
        Create a new account
      </h2>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <form className="flex flex-col gap-4">
          {/* Full name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">
              Full name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300
              text-neutral-800 shadow-sm transition-all
              focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none"
            />
          </div>

          {/* Email */}
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

          {/* Signup button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary-600 text-white font-medium
            hover:bg-primary-700 transition-all"
          >
            Create account
          </button>
        </form>
      </div>

      {/* Link to login */}
      <p className="text-sm text-neutral-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
