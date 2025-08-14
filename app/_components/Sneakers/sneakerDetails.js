import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SneakerDetails({ sneaker }) {
  const { id, name, price, category, images, colors } = sneaker;
  return (
    <Link href={`/sneaker/${id}`} className="block">
      <div className="flex flex-col rounded-lg p-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image container */}
        <div className="bg-gray-200 rounded-lg mb-4 aspect-square flex items-center justify-center overflow-hidden">
          <Image
            src={images[0]}
            alt={name}
            width={500}
            height={500}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col space-y-1">
          <h3 className="text-black font-medium text-base leading-tight">
            {name}
          </h3>
          <p className="text-gray-600 text-sm">{category}</p>
          <p className="text-gray-500 text-sm">
            {colors.length > 1
              ? `${colors.length} colors`
              : `${colors.length} color`}
          </p>
          <p className="text-black font-medium text-base mt-2">{price}</p>
        </div>
      </div>
    </Link>
  );
}
