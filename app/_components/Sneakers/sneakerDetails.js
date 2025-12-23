"use client";

import { createFavorite } from "@/lib/data-service";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function SneakerDetails({ sneaker }) {
  const { id, name, price, category, images, colors } = sneaker;
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavorite() {
    setIsFavorite(!isFavorite);

    startTransition(async () => {
      try {
        await createFavorite(sneaker.id);
      } catch (error) {
        setIsFavorite(false);
      }
    });
  }

  return (
    <div className="relative flex flex-col w-full max-w-sm bg-white">
      {/* Heart button (NOT inside Link) */}
      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 z-20
                   flex items-center justify-center
                   w-9 h-9 rounded-full bg-white
                   shadow hover:scale-105 transition"
      >
        <HeartIcon
          className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-black"}`}
        />
      </button>

      {/* Single Link wrapping image + text */}
      <Link href={`/sneaker/${id}`} className="flex flex-col group">
        {/* Image */}
        <div className="relative w-full h-64 sm:h-80 bg-gray-100">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-contain p-6 transition-transform group-hover:scale-105"
            priority
          />
        </div>

        {/* Text */}
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
