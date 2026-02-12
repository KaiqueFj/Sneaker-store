import StarRating from "@/app/_components/ui/star/StarRating";
import ReviewsTransition from "@/app/_components/ui/TransitionEffects/ReviewsTransition";
import { ReviewWithRelations } from "@/types/review";
import { formatDateNoZ } from "@/utils/helpers";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

export default function SneakerReviews({
  reviews,
  setIsReviewOpen,
  isReviewOpen,
}: {
  reviews: ReviewWithRelations[];
  setIsReviewOpen: Dispatch<SetStateAction<boolean>>;
  isReviewOpen: boolean;
}) {
  const ratingAvg = reviews?.[0]?.products?.rating_avg ?? 0;

  return (
    <>
      {/* ===== Header ===== */}
      <div className="flex justify-between w-full py-6 items-center border-b border-primary-600/10">
        <h2 className="text-primary-600 text-xl font-normal">
          Reviews ({reviews.length})
        </h2>

        <button
          type="button"
          onClick={() => setIsReviewOpen((prev) => !prev)}
          className="flex items-center gap-4"
          aria-expanded={isReviewOpen}
          aria-controls="reviews-section"
        >
          <StarRating rating={ratingAvg} />

          <ChevronDownIcon
            className={`w-6 h-6 transition-transform duration-200 ${
              isReviewOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* ===== Reviews list ===== */}
      <ReviewsTransition isOpen={isReviewOpen}>
        {reviews.map((review) => (
          <li key={review.id} className="pb-6">
            <div className="flex flex-col gap-3">
              <StarRating rating={review.rating} />

              <p className="text-lg text-primary-600 font-medium leading-snug">
                {review.comment}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {review.users?.name}
                </span>
                <span>•</span>
                <span>{formatDateNoZ(review.created_at)}</span>
              </div>
            </div>
          </li>
        ))}
      </ReviewsTransition>
    </>
  );
}
