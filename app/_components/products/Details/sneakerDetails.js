"use client";

import Sneaker from "@/app/_components/products/Sneaker";
import { createFavorite, removeFavorite } from "@/services/favorite-service";
import { slugify } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function SneakerDetails({ sneaker }) {
  const {
    id,
    name,
    price,
    category,
    images,
    colors,
    isFavorite,
    sale,
    rating_avg,
  } = sneaker;

  const [isPending, startTransition] = useTransition();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const { data: session } = useSession();
  const router = useRouter();

  const slug = `${id}-${slugify(name)}`;

  function handleFavorite() {
    if (!session?.user?.userId) {
      toast.error(
        "You must log in first to favorite a sneaker! Redirecting you to the login page...",
      );

      setTimeout(() => {
        router.push("/login");
      }, 3000);

      return;
    }

    const nextValue = !isFavoriteState;
    setIsFavoriteState(nextValue);

    startTransition(async () => {
      try {
        if (nextValue) {
          await createFavorite(id);
        } else {
          await removeFavorite(id);
        }
      } catch {
        setIsFavoriteState(!nextValue);
      }
    });
  }

  return (
    <Sneaker.Card slug={slug}>
      <Sneaker.Cover src={images[0]} name={name} />
      <Sneaker.Favorite
        isFavoriteState={isFavoriteState}
        handleFavorite={handleFavorite}
        isPending={isPending}
      />
      <Sneaker.Info>
        <Sneaker.Title>{name}</Sneaker.Title>
        <Sneaker.Category>{category}</Sneaker.Category>
        <Sneaker.Colors count={colors.length} />
        <Sneaker.Price sale={sale} price={price} />
        <Sneaker.Stars rating_avg={rating_avg} />
      </Sneaker.Info>
    </Sneaker.Card>
  );
}
