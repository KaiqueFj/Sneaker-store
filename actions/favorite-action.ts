'use server';

import { requireUser } from '@/lib/requireUser';
import {
  createFavoriteService,
  getFavoritesService,
  removeFavoriteService,
} from '@/services/favorite-service';
import { revalidatePath } from 'next/cache';

export async function createFavoriteAction(sneakerId: string) {
  const userId = await requireUser();

  await createFavoriteService(userId, sneakerId);

  revalidatePath('/favorites');
  revalidatePath('/');
}

export async function removeFavoriteAction(sneakerId: string) {
  const userId = await requireUser();

  await removeFavoriteService(userId, sneakerId);

  revalidatePath('/favorites');
  revalidatePath('/');
}

export async function getFavoritesAction() {
  const userId = await requireUser();
  return getFavoritesService(userId);
}
