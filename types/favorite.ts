import { ProductListItem } from "./product";

export type FavoriteProduct = ProductListItem & {
  isFavorite: true;
  favoriteId: string;
};
