import { createFavorite, getFavorites, removeFavorite } from '@/repository/favorites-repository';
import { FavoriteProduct } from '@/types/product';

export function createFavoriteService(userId: string, sneakerId: string) {
  return createFavorite(userId, sneakerId);
}

export function removeFavoriteService(userId: string, sneakerId: string): Promise<void> {
  return removeFavorite(userId, sneakerId);
}

export async function getFavoritesService(userId: string): Promise<FavoriteProduct[]> {
  const data = await getFavorites(userId);

  if (!data) return [];

  return data
    .map((f) => {
      const product = Array.isArray(f.products) ? f.products[0] : f.products;

      if (!product) return null;

      return {
        ...product,
        isFavorite: true,
        favoriteId: f.id,
        sale: null,
      } satisfies FavoriteProduct;
    })
    .filter(Boolean) as FavoriteProduct[];
}
