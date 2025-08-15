import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SneakerDetails({ sneaker }) {
  const { id, name, price, category, images, colors } = sneaker;

  return (
    <div className="flex w-full">
      <Link href={`/sneaker/${id}`} className="w-fit flex">
        <div className="flex flex-col rounded-lg mb-10 p-2.5 w-fit bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          {/* Image */}
          <div className="bg-gray-200 mb-2 flex items-center justify-center overflow-hidden w-[592px] md:h-[550px] sm:h-[350px]">
            <Image
              src={images[0]}
              alt={name}
              width={600}
              height={500}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Info */}
          <h3 className="text-black font-bold text-lg leading-tight mb-1">
            {name}
          </h3>
          <p className="text-gray-600 text-sm">{category}</p>
          <p className="text-gray-500 text-sm mb-2">
            {colors.length} {colors.length === 1 ? "Color" : "Colors"}
          </p>
          {/* Price */}
          <p className="text-black font-semibold text-base mt-auto">${price}</p>
        </div>
      </Link>
    </div>
  );
}
