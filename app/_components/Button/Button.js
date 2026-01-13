"use client";

import { useFormStatus } from "react-dom";

export default function Button({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="py-3 rounded-xl p-2 font-medium transition-all bg-primary-600   text-primary-50 hover:bg-primary-600/70 "
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
