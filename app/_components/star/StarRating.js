// components/StarRating.jsx
export default function StarRating({ rating, max = 5 }) {
  const percentage = Math.min((rating / max) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* STAR WRAPPER (fixed width reference) */}
        <div className="relative flex">
          {/* Empty stars */}
          <div className="flex text-gray-300">
            {Array.from({ length: max }).map((_, i) => (
              <Star key={i} />
            ))}
          </div>

          {/* Filled stars (masked correctly) */}
          <div
            className="absolute inset-0 overflow-hidden flex text-primary-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          >
            {Array.from({ length: max }).map((_, i) => (
              <Star key={i} />
            ))}
          </div>
        </div>
      </div>

      <span className="text-sm border px-1  border-primary-600/20 text-gray-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function Star() {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
