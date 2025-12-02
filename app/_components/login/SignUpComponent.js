import Link from "next/link";
import SignInButton from "./SignInButton";
import { signUpNewUserAction } from "@/app/_lib/actions";
import Button from "../Button/Button";

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
        <form className="flex flex-col gap-4" action={signUpNewUserAction}>
          {/* Full name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">
              Full name
            </label>
            <input
              required
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
              required
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
              required
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300
              text-neutral-800 shadow-sm transition-all
              focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none"
            />
          </div>

          {/* Signup button */}

          <Button pendingLabel="Creating user...">Sign up</Button>
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
