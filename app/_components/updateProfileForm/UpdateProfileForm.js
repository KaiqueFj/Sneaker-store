"use client";

import Image from "next/image";
import { updateUserProfile } from "@/app/_lib/actions";
import Button from "@/app/_components/Button/Button";

export default function UpdateProfileForm({ user, children }) {
  const { name, email, nationality, nationalID, countryFlag } = user;

  return (
    <form
      action={updateUserProfile}
      className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="name"
          disabled
          defaultValue={name}
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="relative flex items-end justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative w-10 h-10">
            <Image
              className="rounded-sm"
              src={countryFlag}
              alt="Country flag"
              fill
            />
          </div>
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button pendingLabel="updating...">Update Profile</Button>
      </div>
    </form>
  );
}
