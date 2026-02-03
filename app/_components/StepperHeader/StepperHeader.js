import { useRouter } from "next/navigation";

export default function StepperHeader({ currentPath }) {
  const router = useRouter();

  const options = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
    { label: "Payment", href: "/checkout/payment" },
  ];

  const currentIndex = options.findIndex((opt) => opt.href === currentPath);

  return (
    <div className="flex max-w-7xl mx-auto w-full justify-center mt-10">
      <div className="flex flex-row w-full">
        {options.map((option, index) => {
          const isCurrent = currentIndex === index;
          const canClick = index <= currentIndex;

          return (
            <div
              key={option.label}
              id={index + 1}
              onClick={() => canClick && router.push(option.href)}
              className={`
                relative flex flex-1 items-center justify-center-safe
                px-6 py-4 transition-all duration-200
                ${isCurrent ? "bg-primary-800" : "bg-primary-700"}
                ${canClick ? "group cursor-pointer" : "cursor-not-allowed opacity-50"}
              `}
            >
              {/* Step number */}
              <span
                className={`
                  mr-3 flex h-6 w-6 items-center justify-center rounded-full
                  ${isCurrent ? "bg-primary-600 text-white" : "bg-gray-500 text-white"}
                  ${canClick && !isCurrent ? "group-hover:bg-primary-600 group-hover:text-white" : ""}
                  transition-colors
                `}
              >
                {index + 1}
              </span>

              {/* Step label */}
              <span
                className={`
                  text-base font-medium
                  ${isCurrent ? "text-primary-600" : "text-gray-400"}
                  ${canClick && !isCurrent ? "group-hover:text-primary-600" : ""}
                  transition-colors
                `}
              >
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
