'use server';

import {
  getNewestSneakers,
  getSneakerDetails,
  getSneakers,
  getSneakerSearch,
  getSneakersOnSale,
} from '@/repository/sneakers-repository';
import { ProductDetails, ProductListItem, ProductRow } from '@/types/product';

// Reusable function to get a user's favorite for a product
function extractFavorite(favorites: { id: string; client_id: string }[] | undefined, userId: string | null) {
  if (!userId || !favorites) return null;
  return favorites.find((f) => f.client_id === userId) ?? null;
}

// Map ProductRow to ProductListItem with sale and favorite info
function mapProductToListItem(product: ProductRow, userId?: string | null): ProductListItem {
  const now = new Date();
  const activeSale = product.sales?.find((sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now) ?? null;
  const favorite = extractFavorite(product.favorites, userId ?? null);

  const { sales, favorites, ...rest } = product;

  return {
    ...rest,
    sale: activeSale,
    isFavorite: Boolean(favorite),
    favoriteId: favorite?.id ?? null,
  };
}

// Get all sneakers with optional filter
export async function getSneakersService(
  userId: string | null,
  filterKey?: string,
  filterValue?: string,
): Promise<ProductListItem[]> {
  const data = await getSneakers(filterKey, filterValue);
  return data.map((p) => mapProductToListItem(p, userId));
}

// Search sneakers
export async function getSneakerSearchService(searchTerm: string, userId?: string | null): Promise<ProductListItem[]> {
  const data = await getSneakerSearch(searchTerm);
  return data.map((p) => mapProductToListItem(p, userId ?? null));
}

// Get sneaker details
export async function getSneakerDetailsService(userId: string | null, id: string): Promise<ProductDetails> {
  const data = await getSneakerDetails(id);
  const favorite = extractFavorite(data.favorites, userId);

  const { favorites, ...rest } = data;

  return {
    ...rest,
    isFavorite: Boolean(favorite),
    favoriteId: favorite?.id ?? null,
  };
}

// Sneakers currently on sale
export async function getSneakersOnSaleService(userId: string | null): Promise<ProductListItem[]> {
  const data = await getSneakersOnSale();
  return data.map((p) => mapProductToListItem(p, userId)).filter((p) => p.sale !== null);
}

// Newest sneakers (last 3 months)
export async function getNewestSneakersService(userId: string | null): Promise<ProductListItem[]> {
  const data = await getNewestSneakers();
  return data.map((p) => {
    const favorite = extractFavorite(p.favorites, userId);
    const { favorites, ...rest } = p;
    return {
      ...rest,
      sale: null,
      isFavorite: Boolean(favorite),
      favoriteId: favorite?.id ?? null,
    };
  });
}
