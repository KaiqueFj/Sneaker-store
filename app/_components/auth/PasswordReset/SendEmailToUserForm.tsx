"use client";

import { sendResetPasswordlinkToEmail } from "@/actions/user-action";
import Logo from "@/app/_components/layout/Header/logo/Logo";
import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SendEmailToUserForm() {
  async function handleSubmit(formData: FormData) {
    try {
      await toast.promise(sendResetPasswordlinkToEmail(formData), {
        loading: "Sending...",
        success: (data) => data.message,
        error: (err) => err.message,
      });
    } catch {
      // errors are already handled by toast.promise
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">
            <Logo />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold leading-tight text-gray-900">
          Enter your e-mail
          <br />
          to reset your password
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          {"We will send you an email with a link to reset your password."}
        </p>

        <Form action={handleSubmit} className="mt-8 space-y-6">
          <Form.Field>
            <Form.Label>E-mail</Form.Label>
            <Form.Input
              name="email"
              type="email"
              placeholder="your@email.com"
            />
          </Form.Field>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 ">
            <Link
              href="/login"
              className="text-base text-primary-600 border-primary-600/20 border-2 px-8 py-3 rounded-full hover:border-primary-600 transition"
            >
              Cancel
            </Link>
            <Button
              pendingLabel="Sending..."
              variant="primary"
              size="lg"
              className="font-medium"
            >
              Send link
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
