export default function SneakerDetailsModal({
  description,
  isDescriptionOpen,
  setIsDescriptionOpen,
}) {
  return (
    <div>
      (
      {isDescriptionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white max-w-xl w-full mx-4 rounded-xl p-6 relative">
            <button
              onClick={() => setIsDescriptionOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h3 className="mb-4 text-lg font-semibold">Product Details</h3>

            <p className="whitespace-pre-line text-sm leading-7 text-gray-700 [&>strong]:text-gray-900">
              {description}
            </p>
          </div>
        </div>
      )}
      )
    </div>
  );
}
