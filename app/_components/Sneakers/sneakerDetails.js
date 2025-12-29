"use client";

import { createFavorite, removeFavorite } from "@/lib/data-service";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function SneakerDetails({ sneaker }) {
  const { id, name, price, category, images, colors, isFavorite } = sneaker;

  const [isPending, startTransition] = useTransition();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  function handleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();

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
    <Link href={`/sneaker/${id}`} className="group relative flex flex-col">
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        disabled={isPending}
        className="
          absolute top-3 right-3 z-20
          w-9 h-9 rounded-full
          flex items-center justify-center
          bg-white/70 backdrop-blur
          shadow
          transition hover:scale-110
        "
      >
        <HeartIcon
          className={`w-4 h-4 transition ${
            isFavoriteState ? "text-red-500" : "text-gray-900"
          }`}
        />
      </button>

      {/* Image */}
      <div
        className="
          relative w-full aspect-square
          bg-gray-100
          rounded-lg
          overflow-hidden
        "
      >
        <Image
          src={images[0]}
          alt={name}
          fill
          className="
            object-contain
            transition-transform duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* Info */}
      <div className="mt-4 space-y-0.5">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>

        <p className="text-xs text-gray-500">{category}</p>

        <p className="text-xs text-gray-400">
          {colors.length} {colors.length === 1 ? "Color" : "Colors"}
        </p>

        <p className="pt-1 text-sm font-medium text-gray-900">${price}</p>
      </div>
    </Link>
  );
}
