"use client";

import { slugify } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultItem({ sneaker, onClose }) {
  const { id, name, price, images, category, gender, sale } = sneaker;
  const slug = `${id}-${slugify(name)}`;

  return (
    <Link
      href={`/sneaker/${slug}`}
      onClick={onClose}
      className=" flex items-center gap-6 w-full px-5 py-4 rounded-xl hover:bg-gray-100 transition"
    >
      {/* Image */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
        <Image src={images[0]} alt={name} fill className="object-contain" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-gray-900 line-clamp-2">
          {name}
        </p>

        <p className="text-sm text-gray-500">
          {category} · {gender?.[0] ?? "Unisex"}
        </p>

        <p className="mt-1 text-base font-semibold text-gray-900">
          {sale ? (
            <>
              $
              {(
                sale.discountPrice ??
                price * (1 - sale.discountPercentage / 100)
              ).toFixed(2)}
            </>
          ) : (
            <>${price}</>
          )}
        </p>
      </div>
    </Link>
  );
}
