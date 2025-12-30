import StarInput from "@/app/_components/star/starInput";
import { createReview } from "@/lib/data-service";
import { useState } from "react";

export default function ReviewComponent({ item, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmitReview() {
    try {
      setLoading(true);

      await createReview({
        sneaker_id: item.sneaker_id,
        rating,
        comment,
      });
      setLoading(false);
      onClose();
    } catch (error) {
      throw new Error("Could not create review");
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
          placeholder="Write your thoughts..."
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded mt-3 p-2"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={rating === 0 || loading}
            onClick={handleSubmitReview}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
