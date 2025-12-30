export default function StarRating({ rating, max = 5 }) {
  const starSize = 16;
  const filledWidth = (rating / max) * starSize * max;

  return (
    <div className="flex items-center gap-6">
      <div
        className="relative"
        style={{ width: starSize * max, height: starSize }}
      >
        {/* Empty */}
        <div className="flex gap-0 text-gray-300">
          {Array.from({ length: max }).map((_, i) => (
            <Star key={i} />
          ))}
        </div>

        {/* Filled */}
        <div
          className="absolute inset-0 overflow-hidden flex gap-0 text-primary-600"
          style={{ width: filledWidth }}
        >
          {Array.from({ length: max }).map((_, i) => (
            <Star key={i} />
          ))}
        </div>
      </div>

      <span className="text-sm border px-1 border-primary-600/20 text-gray-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function Star() {
  return (
    <svg
      className="w-5 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
