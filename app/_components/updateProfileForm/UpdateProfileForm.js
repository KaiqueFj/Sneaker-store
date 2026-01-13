"use client";

import { toast } from "react-hot-toast";
import { updateUserProfile } from "../../../lib/actions";
import Button from "../Button/Button";

export default function UpdateProfileForm({ user }) {
  const { name, email, birthday } = user;

  async function handleSubmit(formData) {
    toast.dismiss();

    const name = formData.get("name");
    const email = formData.get("email");

    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }

    toast.loading("Updating profile...");

    try {
      await updateUserProfile(formData);

      toast.dismiss();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-10">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Full name
        </label>
        <input
          name="name"
          defaultValue={name}
          className="border-b border-gray-300 bg-transparent px-1 py-2
                     text-base text-black
                     focus:border-black focus:outline-none"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Email address
        </label>
        <input
          name="email"
          defaultValue={email}
          className="border-b border-gray-300 bg-transparent px-1 py-2
                     text-base text-black
                     focus:border-black focus:outline-none"
        />
      </div>

      {/* Birthday */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Birthday
        </label>
        <input
          name="birthday"
          type="date"
          defaultValue={birthday ?? ""}
          className="border-b border-gray-300 bg-transparent px-1 py-2
                     text-base text-black
                     focus:border-black focus:outline-none"
        />
      </div>

      {/* Actions */}
      <div className="pt-6">
        <Button pendingLabel="Updating...">Save changes</Button>
      </div>
    </form>
  );
}
