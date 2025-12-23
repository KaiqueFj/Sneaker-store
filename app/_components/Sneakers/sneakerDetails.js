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
      } catch (error) {
        setIsFavoriteState(!nextValue);
      }
    });
  }

  return (
    <div className="relative flex flex-col w-full max-w-sm bg-white">
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        disabled={isPending}
        className="absolute top-3 right-3 z-20
                   flex items-center justify-center
                   w-9 h-9 rounded-full bg-white
                   shadow hover:scale-105 transition"
      >
        <HeartIcon
          className={`w-5 h-5 transition ${
            isFavoriteState ? "text-red-500" : "text-black"
          }`}
        />
      </button>

      {/* Card Link */}
      <Link href={`/sneaker/${id}`} className="flex flex-col group">
        <div className="relative w-full h-64 sm:h-80 bg-gray-100">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-contain p-6 transition-transform group-hover:scale-105"
            priority
          />
        </div>

        <div className="px-3 py-3">
          <h3 className="font-semibold text-sm">{name}</h3>
          <p className="text-xs text-gray-500">{category}</p>
          <p className="text-xs text-gray-500">
            {colors.length} {colors.length === 1 ? "Color" : "Colors"}
          </p>
          <p className="mt-1 font-semibold">${price}</p>
        </div>
      </Link>
    </div>
  );
}
