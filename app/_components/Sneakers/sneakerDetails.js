"use client";

import { createFavorite, removeFavorite } from "@/lib/data-service";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function SneakerDetails({ sneaker }) {
  const { id, name, price, category, images, colors, isFavorite, sale } =
    sneaker;

  const [isPending, startTransition] = useTransition();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const { data: session } = useSession();
  const router = useRouter();

  function handleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.userId) {
      toast.error(
        "You must log in first to favorite a sneaker! Redirecting you to the login page..."
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
    <Link
      href={`/sneaker/${id}`}
      className="group relative flex flex-col h-full"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        disabled={isPending}
        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/70 backdrop-blur shadow transition hover:scale-110"
      >
        {isFavoriteState ? (
          <HeartSolid className="w-4 h-4 text-red-500 transition" />
        ) : (
          <HeartOutline className="w-4 h-4 text-gray-900 transition" />
        )}
      </button>

      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="mt-4 grid grid-rows-[auto_auto_auto_auto] gap-y-1 min-h-24">
        <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-900 line-clamp-2 leading-snug">
          {name}
        </h3>

        <p className="text-xs md:text-sm lg:text-base text-gray-500 truncate">
          {category}
        </p>

        <p className="text-xs text-gray-400">
          {colors.length} {colors.length === 1 ? "Color" : "Colors"}
        </p>

        <p className="text-color-primary-600 font-bold text-sm sm:text-base mt-auto">
          {sale ? (
            <span className="flex items-center gap-2">
              <span className="font-bold text-primary-600">
                $
                {(
                  sale.discountPrice ??
                  price * (1 - sale.discountPercentage / 100)
                ).toFixed(2)}
              </span>

              <span className="line-through font-normal text-gray-500">
                ${price}
              </span>

              <span className="text-green-700 text-sm font-medium">
                {sale.discountPercentage}% off
              </span>
            </span>
          ) : (
            <span className="font-bold">${price}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
