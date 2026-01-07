import StarRating from "@/app/_components/star/StarRating";
import { formatDateNoZ } from "@/utils/helpers";

export default function SneakerReviews({ reviews }) {
  const ratingAvg = reviews?.[0]?.sneakers?.rating_avg ?? 0;
  return (
    <>
      {/* ===== Header ===== */}
      <div className="flex flex-row justify-between w-full py-6 items-center border-b border-primary-600/10">
        <h2 className="text-primary-600 text-xl font-normal">
          Reviews ({reviews.length})
        </h2>
        <StarRating rating={ratingAvg} />
      </div>

      {/* ===== Reviews list ===== */}
      <ul className="grid gap-6 mt-6">
        {reviews.map((review) => (
          <li key={review.id}>
            <div className="flex flex-col gap-2.5">
              <StarRating rating={review.rating} />

              <p className="text-xl text-primary-600 font-medium">
                {review.comment}
              </p>

              <div className="flex gap-2 flex-row text-sm">
                <span className="text-primary-600">{review.users?.name}</span>
                <span>-</span>
                <span className="text-primary-600">
                  {formatDateNoZ(review.created_at)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
