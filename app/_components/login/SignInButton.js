"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/account" })}
      className="flex items-center gap-6 px-10 py-4 text-base font-medium
      text-color-primary-400-700 bg-white border border-gray-300 rounded-xl
      shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
    >
      <Image
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height={24}
        width={24}
      />
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;
