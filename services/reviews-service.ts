import { getSneakersReview, getUserReviews, getUsersReviews, upsertReview } from '@/repository/reviews-repository';
import { Review, ReviewInput, ReviewWithRelations } from '@/types/review';

export function getSneakersReviewsService(sneakerId: string): Promise<ReviewWithRelations[]> {
  return getSneakersReview(sneakerId);
}

export function getUserReviewsService(userId: string): Promise<ReviewWithRelations[]> {
  return getUserReviews(userId);
}

/* Upsert review (create or update) */
export function upsertReviewService({ userId, product_id, rating, comment }: ReviewInput): Promise<Review> {
  return upsertReview(userId, product_id, comment, rating);
}

export function getUsersReviewsService(sneakerId: string): Promise<ReviewWithRelations[]> {
  return getUsersReviews(sneakerId);
}
