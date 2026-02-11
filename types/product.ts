export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  images?: string[];
  image?: string;
  sizes?: string[];
  colors: string[];
  gender: string;
  model: string;
};

export type Sale = {
  discountPercentage: number;
  startDate: string;
  endDate: string;
};

export type Favorite = {
  id: string;
  client_id: string;
};

export type ProductRow = Product & {
  sales: Sale[] | null;
  favorites: Favorite[] | null;
};

export type ProductListItem = Product & {
  sale: Sale | null;
  isFavorite: boolean;
  favoriteId: string | null;
};

export type NewestProductRow = Product & {
  favorites: Favorite[] | null;
};
