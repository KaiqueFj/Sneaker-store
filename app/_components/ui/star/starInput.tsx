"use client";

export default function StarInput({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange(starValue)}
            className="focus:outline-none"
            aria-label={`Rate ${starValue} star`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-6 h-6 transition-colors ${
                starValue <= value ? "text-primary-600" : "text-gray-300"
              }`}
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
