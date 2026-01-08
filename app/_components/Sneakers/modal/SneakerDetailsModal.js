"use client";

export default function SneakerDetailsModal({
  description,
  isDescriptionOpen,
  setIsDescriptionOpen,
}) {
  if (!isDescriptionOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setIsDescriptionOpen(false)}
    >
      <div
        className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold tracking-tight">
            Product Details
          </h2>

          <button
            onClick={() => setIsDescriptionOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto text-sm leading-7 text-primary-600 font-medium whitespace-pre-line">
          {description}
        </div>
      </div>
    </div>
  );
}
