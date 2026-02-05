"use client";

import { useRouter } from "next/navigation";

export default function StepperHeader({ currentPath }) {
  const router = useRouter();

  const options = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
    { label: "Payment", href: "/checkout/payment" },
  ];

  const currentIndex = options.findIndex((opt) => opt.href === currentPath);

  const progressPercent = ((currentIndex + 1) / options.length) * 100;

  return (
    <div className="w-full border-b border-primary-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile step indicator */}
        <div className="md:hidden mb-3 text-center text-base font-medium text-primary-600">
          Step {currentIndex + 1} of {options.length}
        </div>

        {/* Steps */}
        <div className="relative flex items-center">
          {options.map((option, index) => {
            const isCurrent = index === currentIndex;
            const isCompleted = index < currentIndex;
            const canClick = index <= currentIndex;

            return (
              <div
                key={option.label}
                onClick={() => canClick && router.push(option.href)}
                className={`
                  relative flex flex-1 items-center justify-center
                  py-3 transition-all
                  ${
                    canClick
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-40"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {/* Step circle */}
                  <span
                    className={`
                      flex h-7 w-7 items-center justify-center rounded-full
                      text-sm font-semibold transition-all
                      ${
                        isCompleted
                          ? "bg-primary-600 text-white"
                          : isCurrent
                            ? "bg-white text-primary-600 ring-2 ring-primary-600"
                            : "bg-gray-400 text-white"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </span>

                  {/* Label (hidden on mobile) */}
                  <span
                    className={`
                      hidden md:inline text-sm font-medium transition-colors
                      ${
                        isCurrent
                          ? "text-primary-600"
                          : isCompleted
                            ? "text-primary-600"
                            : "text-gray-400"
                      }
                    `}
                  >
                    {option.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-200">
            <div
              className="h-full bg-primary-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
