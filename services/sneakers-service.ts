"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { NewestProductRow, ProductListItem, ProductRow } from "@/types/product";

export async function getSneakers(
  filterKey?: string,
  filterValue?: string,
): Promise<ProductListItem[]> {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  let query = supabase
    .from("products")
    .select(
      `
        *,
        sales (
          discountPercentage,
          startDate,
          endDate
        ),
        favorites (
          id,
          client_id
        )
      `,
    )
    .order("name");

  if (filterKey && filterValue) {
    if (["gender", "category"].includes(filterKey)) {
      query = query.contains(filterKey, [filterValue]);
    } else {
      query = query.ilike(filterKey, `%${filterValue}%`);
    }
  }

  const { data, error } = await query;
  if (error) throw new Error("products could not be loaded");

  const now = new Date();

  return (data as ProductRow[]).map((s) => {
    const activeSale =
      s.sales?.find(
        (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now,
      ) ?? null;

    const favorite =
      userId && s.favorites
        ? s.favorites.find((f) => f.client_id === userId)
        : null;

    const { sales, favorites, ...product } = s;

    return {
      ...product,
      sale: activeSale,
      isFavorite: Boolean(favorite),
      favoriteId: favorite?.id ?? null,
    };
  });
}

export async function getSneakerSearch(
  searchTerm: string,
): Promise<ProductListItem[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${searchTerm}%`);

  if (error) throw new Error("products could not be loaded");
  return data;
}

export async function getSneakerListItem(id: string): Promise<ProductListItem> {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        *,
        sales (
          discountPercentage,
          startDate,
          endDate
        ),
        favorites (
          id,
          client_id
        )
      `,
    )
    .eq("id", id)
    .single<ProductRow>();

  if (error || !data) {
    throw new Error("Sneaker could not be loaded");
  }

  const now = new Date();

  const activeSale =
    data.sales?.find(
      (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now,
    ) ?? null;

  const favorite =
    userId && data.favorites
      ? data.favorites.find((f) => f.client_id === userId)
      : null;

  const { sales, favorites, ...sneaker } = data;

  return {
    ...sneaker,
    sale: activeSale,
    isFavorite: Boolean(favorite),
    favoriteId: favorite?.id ?? null,
  };
}

import { ProductDetails } from "@/types/product";

export async function getSneakerDetails(
  id: string
): Promise<ProductDetails> {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        *,
        favorites (
          id,
          client_id
        )
      `
    )
    .eq("id", id)
    .single<ProductRow>();

  if (error || !data) {
    throw new Error("Sneaker could not be loaded");
  }

  const favorite =
    userId && data.favorites
      ? data.favorites.find((f) => f.client_id === userId)
      : null;

  const { favorites, ...product } = data;

  return {
    ...product, 
    isFavorite: Boolean(favorite),
    favoriteId: favorite?.id ?? null,
  };
}


export async function getSneakersOnSale(): Promise<ProductListItem[]> {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        *,
        sales (
          discountPercentage,
          startDate,
          endDate
        ),
        favorites (
          id,
          client_id
        )
      `,
    )
    .not("sales", "is", null)
    .order("name");

  if (error) throw new Error("Sneakers could not be loaded");

  const now = new Date();

  return (data as ProductRow[])
    .map((s) => {
      const activeSale = s.sales?.find(
        (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now,
      );

      if (!activeSale) return null;

      const favorite = userId
        ? s.favorites?.find((f) => f.client_id === userId)
        : null;

      const { sales, favorites, ...sneaker } = s;

      return {
        ...sneaker,
        sale: activeSale,
        isFavorite: Boolean(favorite),
        favoriteId: favorite?.id ?? null,
      };
    })
    .filter(Boolean);
}

export async function getNewestSneakers(): Promise<ProductListItem[]> {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        *,
        favorites (
          id,
          client_id
        )
      `,
    )
    .gte("created_at", threeMonthsAgo.toISOString())
    .order("created_at", { ascending: false });

  if (error || !data) {
    throw new Error("Sneakers could not be loaded: " + error?.message);
  }

  return (data as NewestProductRow[]).map((s) => {
    const favorite =
      userId && s.favorites
        ? s.favorites.find((f) => f.client_id === userId)
        : null;

    const { favorites, ...product } = s;

    return {
      ...product,
      sale: null,
      isFavorite: Boolean(favorite),
      favoriteId: favorite?.id ?? null,
    };
  });
}
