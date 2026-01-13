"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { supabase } from "./supabase";

// Reviews

export async function getReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select(`*, sneakers (rating_avg, rating_count), users (name)`);

  if (error) {
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

export async function getSneakersReviews(sneakerId) {
  const { data, error } = await supabase
    .from("reviews")
    .select(`*, sneakers (rating_avg, rating_count), users (name)`)
    .eq("sneaker_id", sneakerId);

  if (error) {
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

export async function getUserReviews(userId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("client_id", userId);

  if (error) {
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

// Upsert inserts or update if the info exists already or not
export async function upsertReview({ sneaker_id, rating, comment }) {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("reviews")
    .upsert(
      {
        sneaker_id,
        client_id: session.user.userId,
        rating,
        comment,
      },
      { onConflict: "client_id,sneaker_id" }
    )
    .select()
    .single();

  return data;
}

// Favorites
export async function createFavorite(sneakerId) {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("favorites").insert({
    sneaker_id: sneakerId,
    client_id: session.user.userId,
  });

  if (error) {
    throw new Error("Could not add favorite");
  }

  revalidatePath("/favorites");
  revalidatePath("/"); // or your sneakers listing page
}

export async function removeFavorite(sneakerId) {
  const session = await auth();

  await supabase
    .from("favorites")
    .delete()
    .eq("client_id", session.user.userId)
    .eq("sneaker_id", sneakerId);

  revalidatePath("/favorites");
  revalidatePath("/");
}

export async function getFavorites() {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
        id,
        created_at,
        sneakers (
          id,
          name,
          price,
          category,
          images,
          sizes,
          colors,
          gender,
          model,
          rating_avg,
          rating_count
        )
      `
    )
    .eq("client_id", session.user.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map((f) => ({
    ...f.sneakers,
    isFavorite: true,
    favoriteId: f.id,
  }));
}

// =====================
// Sneakers
// =====================
export const getSneakers = async function (filterKey, filterValue) {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  let query = supabase
    .from("sneakers")
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
      `
    )
    .order("name");

  // Filters
  if (filterKey && filterValue) {
    if (["gender", "category"].includes(filterKey)) {
      query = query.contains(filterKey, [filterValue]);
    } else {
      query = query.ilike(filterKey, `%${filterValue}%`);
    }
  }

  const { data, error } = await query;
  if (error) throw new Error("Sneakers could not be loaded");

  const now = new Date();

  return data.map((s) => {
    // Active sale
    const activeSale = s.sales?.find(
      (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now
    );

    // Favorite logic (only for logged user)
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
};

export const getSneakerSearch = async function (searchTerm) {
  const { data, error } = await supabase
    .from("sneakers")
    .select("*")
    .ilike("name", `%${searchTerm}%`);
  if (error) throw new Error("Sneakers could not be loaded");
  return data;
};

export const getSneaker = async function (id) {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  const { data, error } = await supabase
    .from("sneakers")
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
      `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Sneaker could not be loaded");
  }

  const now = new Date();

  const activeSale = data.sales?.find(
    (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now
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
};

export const getSneakersOnSale = async function () {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  const { data, error } = await supabase
    .from("sneakers")
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
      `
    )
    .not("sales", "is", null)
    .order("name");

  if (error) throw new Error("Sneakers could not be loaded");

  const now = new Date();

  return data
    .map((s) => {
      const activeSale = s.sales?.find(
        (sa) => new Date(sa.startDate) <= now && new Date(sa.endDate) >= now
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
};

export const getNewestSneakers = async function () {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const { data, error } = await supabase
    .from("sneakers")
    .select(
      `
        *,
        favorites (
          id,
          client_id
        )
      `
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
};

// =====================
// Orders
// =====================
export const createOrder = async function ({ cartItems, total_price }) {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const client_id = session.user.userId;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ client_id, total_price })
    .select()
    .single();

  if (orderError) {
    throw new Error("Order could not be created");
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    sneaker_id: item.id,
    quantity: item.quantity || 1,
    price: item.price,
    size: item.size,
    image: [item.image],
    name: item.name,
    category: item.category,
    model: item.model,
    colors: item.colors,
    gender: item.gender,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw new Error("Order items could not be created");
  }

  return order;
};

export const getOrders = async function (clientId) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        id,
        client_id,
        created_at,
        total_price,
        order_items (*)
      `
    )
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Orders could not be loaded");
  }

  return data;
};

export const getOrderItems = async function (orderId) {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (error) {
    throw new Error("Order items could not be loaded");
  }

  return data;
};

// =====================
// Users
// =====================
export const createUser = async function (user) {
  const { data, error } = await supabase.from("users").insert([user]).single();

  if (error) {
    throw new Error("Could not create user");
  }

  return data;
};

export const getUser = async function (email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  return data;
};
