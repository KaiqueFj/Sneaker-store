'use server';

import { auth } from '@/lib/auth';
import { requireUser } from '@/lib/requireUser';
import {
  getSneakersReviewsService,
  getUserReviewsService,
  getUsersReviewsService,
  upsertReviewService,
} from '@/services/reviews-service';
import { ReviewInput } from '@/types/review';

export async function getSneakersReviewsAction(sneakerId: string) {
  return getSneakersReviewsService(sneakerId);
}

export async function getUserReviewsAction() {
  const session = await auth();
  const userId = session?.user?.userId ?? null;
  return getUserReviewsService(userId);
}

export async function upsertReviewAction(input: ReviewInput) {
  const userId = await requireUser();

  return upsertReviewService({ userId, ...input });
}

export async function getUsersReviewsAction(sneakerId: string) {
  return getUsersReviewsService(sneakerId);
}
