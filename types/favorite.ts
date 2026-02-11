import { Product } from "./product";

export type FavoriteProduct = Product & {
  isFavorite: true;
  favoriteId: string;
};
