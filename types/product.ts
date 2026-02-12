import { ReactNode } from "react";

/* ======================================================
   BASE TYPES (used everywhere)
====================================================== */

export type ProductBase = {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  image?: string;
  sizes: string[];
  colors: string[];
  gender: string;
  model: string;
  rating_avg: number;
  rating_count: number;
};

/* ======================================================
   FULL PRODUCT (details page only)
====================================================== */

export type Product = ProductBase & {
  description: string;
  intro: string;
  benefits: string;
};

/* ======================================================
   SALES & FAVORITES
====================================================== */

export type Sale = {
  discountPercentage: number;
  startDate: string;
  endDate: string;
};

export type Favorite = {
  id: string;
  client_id: string;
};

/* ======================================================
   DATABASE ROWS (Supabase)
====================================================== */

export type ProductRow = Product & {
  sales: Sale[] | null;
  favorites: Favorite[] | null;
};

export type NewestProductRow = ProductBase & {
  favorites: Favorite[] | null;
};

/* ======================================================
   LIST / CATALOG / FAVORITES
====================================================== */

export type ProductListItem = ProductBase & {
  sale: Sale | null;
  isFavorite: boolean;
  favoriteId: string | null;
};

export type FavoriteProduct = ProductListItem & {
  isFavorite: true;
  favoriteId: string;
};

/* ======================================================
   SNEAKER DETAILS VIEW (UI CONTRACT)
====================================================== */

export type SneakerDesktopUI = {
  mainImage: string;
  sneakerSize: string;
  isDescriptionOpen: boolean;
};

export type SneakerDesktopActions = {
  setMainImage: (img: string) => void;
  setSneakerSize: (size: string) => void;
  setIsDescriptionOpen: (open: boolean) => void;
  addToCart: () => void;
  handleFavorite: () => void;
  goToReviews: () => void;
};

export type SneakerDesktopMeta = {
  isFavoriteState: boolean;
  isPending: boolean;
  currentUrl: string;
};

export type SneakerDesktopViewProps = {
  product: Product;
  ui: SneakerDesktopUI;
  actions: SneakerDesktopActions;
  meta: SneakerDesktopMeta;
  children?: ReactNode;
};
