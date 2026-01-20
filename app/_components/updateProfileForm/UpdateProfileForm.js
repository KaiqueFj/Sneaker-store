"use client";

import Form from "@/app/_components/FormCompoundComponent/Form";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "../../../lib/actions";
import Button from "../Button/Button";

export default function UpdateProfileForm({ user }) {
  const { name, email, birthday } = user;

  async function handleSubmit(formData) {
    toast.dismiss();

    const result = await updateUserProfile(formData);

    if (!result?.ok) {
      toast.dismiss();
      toast.error(result?.message ?? "Something went wrong");
      return;
    }

    toast.success("Profile updated successfully");
  }

  return (
    <Form action={handleSubmit}>
      {/* Name */}
      <Form.Field>
        <Form.Label>Full name</Form.Label>
        <Form.Input name="name" type="text" defaultValue={name} />
      </Form.Field>

      {/* Email */}
      <Form.Field>
        <Form.Label>Email address</Form.Label>
        <Form.Input name="email" type="email" defaultValue={email} />
      </Form.Field>

      {/* Birthday */}
      <Form.Field>
        <Form.Label>Birthday</Form.Label>
        <Form.Input name="birthday" type="date" defaultValue={birthday ?? ""} />
      </Form.Field>

      {/* Actions */}
      <Form.Actions>
        <Button pendingLabel="Updating...">Save changes</Button>
      </Form.Actions>
    </Form>
  );
}
