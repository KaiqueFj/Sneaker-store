"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center w-full gap-2 font-medium transition-colors
      hover:bg-primary-900 hover:text-primary-600/20 text-primary-600"
    >
      <ArrowRightCircleIcon className="w-5 h-5 text-primary-600/70" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
