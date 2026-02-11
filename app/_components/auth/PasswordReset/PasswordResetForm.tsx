"use client";

import { updateUserPassword } from "@/actions/user-action";
import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import { toast } from "react-hot-toast";

export default function UpdatePasswordForm() {
  async function handleSubmit(formData: FormData) {
    try {
      await toast.promise(updateUserPassword(formData), {
        loading: "Updating...",
        success: (data) => data.message,
        error: (err) => err.message,
      });
    } catch {}
  }

  return (
    <Form action={handleSubmit}>
      {/* Password */}
      <Form.Field>
        <Form.Label>New password</Form.Label>
        <Form.Input
          name="New-password"
          type="password"
          placeholder="••••••••"
        />
      </Form.Field>

      {/* Reenter password */}
      <Form.Field>
        <Form.Label>Reenter password</Form.Label>
        <Form.Input
          name="Reenter-password"
          type="password"
          placeholder="••••••••"
        />
      </Form.Field>

      {/* Actions */}
      <Form.Actions>
        <Button
          className="w-fit"
          size="lg"
          variant="primary"
          pendingLabel="Updating..."
        >
          Update password
        </Button>
      </Form.Actions>
    </Form>
  );
}
