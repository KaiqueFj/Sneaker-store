export default function SneakerDetailsModal({
  description,
  isDescriptionOpen,
  setIsDescriptionOpen,
}) {
  return (
    <div>
      (
      {isDescriptionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/40">
          <div className="bg-white flex max-w-xl w-full gap-10 mx-4 rounded-xl p-10 relative">
            <button
              onClick={() => setIsDescriptionOpen(false)}
              className="absolute top-4 right-4 text-gray-500 px-3  py-2 rounded-full bg-gray-200 hover:text-black"
            >
              ✕
            </button>

            <p className="whitespace-pre-line mt-8 font-medium text-base leading-7 text-primary-600 [&>strong]:text-gray-900">
              {description}
            </p>
          </div>
        </div>
      )}
      )
    </div>
  );
}
