"use client";

import SneakerDetailsTransition from "@/app/_components/ui/TransitionEffects/SneakerDetailsTransition";

type SneakerDetailsModalProps = {
  description: string;
  isDescriptionOpen: boolean;
  setIsDescriptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SneakerDetailsModal({
  description,
  isDescriptionOpen,
  setIsDescriptionOpen,
}: SneakerDetailsModalProps) {
  return (
    <SneakerDetailsTransition
      isOpen={isDescriptionOpen}
      onClose={() => setIsDescriptionOpen(false)}
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
    </SneakerDetailsTransition>
  );
}
