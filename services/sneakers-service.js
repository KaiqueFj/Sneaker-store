"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function getSneakers(filterKey, filterValue) {
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

  return data.map((s) => {
    const activeSale = s.sales?.find(
      (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now,
    );

    const favorite = userId
      ? s.favorites?.find((f) => f.client_id === userId)
      : null;

    const { sales, favorites, ...sneaker } = s;

    return {
      ...sneaker,
      sale: activeSale || null,
      isFavorite: Boolean(favorite),
      favoriteId: favorite?.id ?? null,
    };
  });
}

export async function getSneakerSearch(searchTerm) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${searchTerm}%`);

  if (error) throw new Error("products could not be loaded");
  return data;
}

export async function getSneaker(id) {
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
    .single();

  if (error) throw new Error("Sneaker could not be loaded");

  const now = new Date();

  const activeSale = data.sales?.find(
    (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now,
  );

  const favorite = userId
    ? data.favorites?.find((f) => f.client_id === userId)
    : null;

  const { sales, favorites, ...sneaker } = data;

  return {
    ...sneaker,
    sale: activeSale || null,
    isFavorite: Boolean(favorite),
    favoriteId: favorite?.id ?? null,
  };
}

export async function getSneakersOnSale() {
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

  return data
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

export async function getNewestSneakers() {
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

  if (error) {
    throw new Error("Sneakers could not be loaded: " + error.message);
  }

  return data.map((s) => {
    const favorite = userId
      ? s.favorites?.find((f) => f.client_id === userId)
      : null;

    const { favorites, ...sneaker } = s;

    return {
      ...sneaker,
      isFavorite: Boolean(favorite),
      favoriteId: favorite?.id ?? null,
    };
  });
}
