"use client";

import { slugify } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultItem({ sneaker }) {
  const { id, name, price, images, category, gender, sale } = sneaker;
  const slug = `${id}-${slugify(name)}`;

  return (
    <Link
      href={`/sneaker/${slug}`}
      className="flex flex-col items-start gap-4 px-6 py-6p
                 rounded-2xl hover:bg-gray-100 transition-all
                 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-56 bg-gray-100 rounded-md overflow-hidden">
        <Image src={images[0]} alt={name} fill className="object-contain" />
      </div>

      {/* Info */}
      <div className="flex flex-col items-start text-center gap-1">
        <p className="text-base font-medium text-gray-900 line-clamp-2">
          {name}
        </p>

        <p className="text-sm text-gray-500">
          {category} · {gender?.[0] ?? "Unisex"}
        </p>

        <p className="mt-2 text-base font-semibold text-gray-900">
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
