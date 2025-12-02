"use client";

import { updateUserProfile } from "@/app/_lib/actions";
import Button from "@/app/_components/Button/Button";

export default function UpdateProfileForm({ user }) {
  const { name, email } = user;

  return (
    <form
      action={updateUserProfile}
      className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="name"
          defaultValue={name}
          className="w-full px-5 py-3 bg-white   focus:ring-primary-600/20 outline-none  rounded-md border border-primary-600 text-primary-600   "
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          className="w-full px-5 py-3 bg-white   focus:ring-primary-600/20 outline-none  rounded-md border border-primary-600 text-primary-600   "
        />
      </div>

      <div className="space-y-2">
        <label>Birthday</label>
        <input
          name="birthday"
          type="date"
          defaultValue={user.birthday ? user.birthday : ""}
          className="w-full px-5 py-3 bg-white   focus:ring-primary-600/20 outline-none  rounded-md border border-primary-600 text-primary-600   "
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button pendingLabel="updating...">Update Profile</Button>
      </div>
    </form>
  );
}
