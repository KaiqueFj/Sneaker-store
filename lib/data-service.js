"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { supabase } from "./supabase";

/* =========================================================
   REVIEWS
========================================================= */

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

/* Upsert review (create or update) */
export async function upsertReview({ sneaker_id, rating, comment }) {
  const session = await auth();

  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { data } = await supabase
    .from("reviews")
    .upsert(
      {
        sneaker_id,
        client_id: session.user.userId,
        rating,
        comment,
      },
      { onConflict: "client_id,sneaker_id" },
    )
    .select()
    .single();

  return data;
}

/* =========================================================
   FAVORITES
========================================================= */

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
  revalidatePath("/");
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
      `,
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

/* =========================================================
   SNEAKERS
========================================================= */

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
  if (error) throw new Error("Sneakers could not be loaded");

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
};

/* =========================================================
   ORDERS
========================================================= */

export const createOrder = async function ({
  cartItems,
  address,
  total_price,
}) {
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

  const { error: addressError } = await supabase
    .from("order_addresses")
    .insert({
      order_id: order.id,
      type: "shipping",
      recipient_name: address.recipient_name,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
    });

  if (addressError) {
    throw new Error("Order address could not be created");
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
        order_items (*),
        order_addresses (*)
      `,
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

/* =========================================================
   USERS
========================================================= */

export const createUser = async function (user) {
  const { data, error } = await supabase.from("users").insert([user]).single();

  if (error) {
    throw new Error("Could not create user");
  }

  return data;
};

export const getUser = async function (email) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  return data;
};

/* =========================================================
   ADDRESSES & SHIPPING
========================================================= */

export async function fetchAdressByCep(cep) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await res.json();

  if (data.erro) {
    throw new Error(data.erro.msg);
  }

  return {
    city: data.localidade,
    state: data.uf,
  };
}

export async function upsertUserAdress(formData) {
  const session = await auth();
  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const clientId = session.user.userId;
  const isDefault = formData.get("is_default") === "on";

  if (isDefault) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("client_id", clientId)
      .eq("is_default", true);
  }

  const adressData = {
    label: formData.get("label"),
    recipient_name: formData.get("recipient_name"),
    street: formData.get("street"),
    number: formData.get("number"),
    complement: formData.get("complement"),
    city: formData.get("city"),
    state: formData.get("state"),
    postal_code: formData.get("postal_code"),
    country: formData.get("country"),
    is_default: isDefault,
  };

  const { data, error } = await supabase
    .from("addresses")
    .upsert(
      {
        id: formData.get("id") || undefined,
        client_id: clientId,
        ...adressData,
      },
      { onConflict: "id" },
    )
    .select()
    .single();

  if (error) throw new Error("Could not save address");

  revalidatePath("/account/addresses");

  return {
    message: "Address saved successfully",
    address: data,
  };
}

export async function getUserAddresses(userId) {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("client_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function removeUserAddress(addressId) {
  const session = await auth();
  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("client_id", session.user.userId)
    .eq("id", addressId);

  if (error) throw error;

  revalidatePath("/account/addresses");
}
