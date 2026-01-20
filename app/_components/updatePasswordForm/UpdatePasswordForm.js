"use client";

import Form from "@/app/_components/FormCompoundComponent/Form";
import { toast } from "react-hot-toast";
import { updateUserPassword } from "../../../lib/actions";
import Button from "../Button/Button";

export default function UpdatePasswordForm() {
  async function handleSubmit(formData) {
    toast.dismiss();

    const result = await updateUserPassword(formData);

    if (!result?.ok) {
      toast.dismiss();
      toast.error(result?.message ?? "Something went wrong");
      return;
    }

    toast.success("Profile updated successfully");
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
        <Button pendingLabel="Updating...">Update password</Button>
      </Form.Actions>
    </Form>
  );
}
