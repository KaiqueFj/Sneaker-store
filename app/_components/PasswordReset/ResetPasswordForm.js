import Form from "@/app/_components/FormCompoundComponent/Form";
import Logo from "@/app/_components/Header/logo/Logo";
import { resetPassword } from "@/lib/actions";
import Link from "next/link";

export default async function ResetPasswordForm({ token }) {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-lg">
        {/* Optional brand */}
        <div className="mb-10 flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">
            <Logo />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold leading-tight text-gray-900">
          Create a new password
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          Choose a new password to access your account.
        </p>

        <Form action={resetPassword} className="mt-8 space-y-2">
          {/* Password */}
          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Input
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </Form.Field>

          {/* Confirm password */}
          <Form.Field>
            <Form.Label>Confirm password</Form.Label>
            <Form.Input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
          </Form.Field>

          {/* Helper text */}
          <p className="text-xs text-gray-500">
            {" Make sure it's at least 15 characters OR at least 8 characters"}
          </p>

          <Form.Field>
            <Form.Input type="hidden" name="token" value={token} />
          </Form.Field>

          {/* Actions */}
          <div className="flex items-center justify-end pt-2 gap-4">
            <Link
              href="/login"
              className="text-base text-primary-600 border-primary-600/20 border-2 px-8 py-3 rounded-full hover:border-primary-600 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className=" text-base rounded-full px-8 py-3 font-medium transition-all bg-primary-600   text-primary-50 hover:bg-primary-600/70 "
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
