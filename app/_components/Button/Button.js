"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";

export default function Button({
  children,
  className,
  pendingLabel,
  variant = "primary",
  size = "md",
}) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={clsx(
        "rounded-full font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed",
        {
          // Variants
          "bg-primary-600 text-primary-50 hover:bg-primary-600/70":
            variant === "primary",
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            variant === "secondary",
          "bg-transparent underline text-primary-600": variant === "link",

          // Sizes
          "px-4 py-3 text-base": size === "lg",
          "px-4 py-2 text-sm": size === "md",
          "px-3 py-1.5 text-xs": size === "sm",
        },
        className,
      )}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
