"use client";

import StarRating from "@/app/_components/star/StarRating";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Sneaker({ children }) {
  return (
    <div className="grid gap-x-2 gap-y-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full">
      {children}
    </div>
  );
}

Sneaker.Card = function Card({ children, slug }) {
  return (
    <Link
      href={`/sneaker/${slug}`}
      className="group relative flex flex-col h-full"
    >
      {children}
    </Link>
  );
};

Sneaker.Favorite = function Favorite({
  isFavoriteState,
  handleFavorite,
  isPending,
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFavorite?.(e);
      }}
      disabled={isPending}
      className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full
                 flex items-center justify-center bg-white/70
                 backdrop-blur shadow transition hover:scale-110"
    >
      {isFavoriteState ? (
        <HeartSolid className="w-4 h-4 text-red-500" />
      ) : (
        <HeartOutline className="w-4 h-4 text-gray-900" />
      )}
    </button>
  );
};

Sneaker.Cover = function Cover({ src, name }) {
  return (
    <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={name}
        fill
        className="object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

Sneaker.Info = function Info({ children }) {
  return (
    <div className="mt-4 grid grid-rows-[auto_auto_auto_auto] gap-y-1 min-h-24">
      {children}
    </div>
  );
};

Sneaker.Title = function Title({ children }) {
  return (
    <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-900 line-clamp-2 leading-snug">
      {children}
    </h3>
  );
};

Sneaker.Category = function Category({ children }) {
  return (
    <p className="text-xs md:text-sm lg:text-base text-gray-500 truncate">
      {children}
    </p>
  );
};

Sneaker.Colors = function Colors({ count }) {
  return (
    <p className="text-xs text-gray-500">
      {count > 1 ? `${count} colors` : `${count} color`}
    </p>
  );
};

Sneaker.Price = function Price({ sale, price }) {
  return (
    <p className="text-color-primary-600 font-bold text-sm sm:text-base mt-auto">
      {sale ? (
        <span className="flex items-center gap-2">
          <span className="font-bold text-primary-600">
            $
            {(
              sale.discountPrice ?? price * (1 - sale.discountPercentage / 100)
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
  );
};

Sneaker.Stars = function Stars({ rating_avg }) {
  return <StarRating rating={rating_avg} />;
};
