import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SneakerDetails({ sneaker }) {
  const { id, name, price, category, images, colors, sale } = sneaker;

  return (
    <Link
      href={`/sneaker/${id}`}
      className="flex flex-col w-[92%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-10 bg-white shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xs"
    >
      {/* Image Container */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[35rem] bg-gray-100">
        {/* Responsive height */}
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-contain bg-transparent p-4 transition-transform duration-300 hover:scale-105"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col px-3 sm:px-4 py-2 sm:py-3 flex-1">
        <h3 className="text-black font-semibold text-base sm:text-lg leading-tight mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">{category}</p>
        <p className="text-gray-500 text-xs sm:text-sm mb-2">
          {colors.length} {colors.length === 1 ? "Color" : "Colors"}
        </p>
        <p className="text-black font-bold text-sm sm:text-base mt-auto">
          {sneaker.sale ? (
            <>
              <span className="flex items-center space-x-2">
                <span className="font-bold text-primary-500">
                  $
                  {(
                    sneaker.sale.discountPrice ??
                    sneaker.price * (1 - sneaker.sale.discountPercentage / 100)
                  ).toFixed(2)}
                </span>

                <span className="line-through font-normal text-gray-500">
                  ${sneaker.price}
                </span>

                <span className="text-green-700 font-medium">
                  {sneaker.sale.discountPercentage}% off
                </span>
              </span>
            </>
          ) : (
            <span className="font-bold">${sneaker.price}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
