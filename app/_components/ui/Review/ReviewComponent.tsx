import MiniSpinner from "@/app/_components/ui/Spinner/miniSpinner";
import StarInput from "@/app/_components/ui/star/starInput";
import { upsertReview } from "@/services/reviews-service";
import { Review, ReviewInput, ReviewWithRelations } from "@/types/review";
import { useState } from "react";
import toast from "react-hot-toast";

type ReviewComponentProps = {
  item: ReviewWithRelations;
  onClose: () => void;
  onSuccess: (newReview: Review) => void;
  review?: Review;
};

export default function ReviewComponent({
  item,
  onClose,
  onSuccess,
  review,
}: ReviewComponentProps) {
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [comment, setComment] = useState(review?.comment ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmitReview() {
    setLoading(true);

    try {
      const updatedReview: ReviewInput = {
        product_id: item.product_id,
        rating,
        comment,
      };

      const savedReview = await toast.promise(upsertReview(updatedReview), {
        loading: "Saving your review...",
        success: review
          ? "Review updated successfully!"
          : "Review saved successfully!",
        error: "Review could not be saved. Try again!",
      });

      onSuccess(savedReview);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="font-semibold text-lg mb-2">Review {item.name}</h3>

        <StarInput value={rating} onChange={setRating} />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full border rounded mt-3 p-2"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>

          <button
            disabled={loading}
            onClick={handleSubmitReview}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white disabled:opacity-60"
          >
            {loading ? (
              <>
                <MiniSpinner />
                Saving...
              </>
            ) : (
              "Submit review"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
