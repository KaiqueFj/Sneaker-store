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
    <Link
      href={`/sneaker/${id}`}
      className="group relative flex flex-col w-full"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        disabled={isPending}
        className="absolute top-4 right-4 z-20
                   flex items-center justify-center
                   w-10 h-10 rounded-full bg-white/90
                   backdrop-blur shadow-sm
                   transition hover:scale-110"
      >
        <HeartIcon
          className={`w-5 h-5 transition ${
            isFavoriteState ? "text-red-500" : "text-black"
          }`}
        />
      </button>

      {/* Image */}
      <div
        className="relative w-full aspect-4/5
                   bg-gray-100 overflow-hidden"
      >
        <Image
          src={images[0]}
          alt={name}
          fill
          priority
          className="object-contain 
                     transition-transform duration-300
                     group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium leading-tight">{name}</h3>

        <p className="text-xs text-gray-500">{category}</p>

        <p className="text-xs text-gray-500">
          {colors.length} {colors.length === 1 ? "Color" : "Colors"}
        </p>

        <p className="pt-1 text-sm font-semibold">${price}</p>
      </div>
    </Link>
  );
}
