import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SneakersList({ name, image, price, category, link }) {
  return (
    <Link href={link} className="block">
      <div className="flex flex-col rounded-lg p-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image container */}
        <div className="bg-gray-200 rounded-lg mb-4 aspect-square flex items-center justify-center overflow-hidden">
          <Image
            src={image}
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
          <p className="text-gray-500 text-sm">2 cores</p>
          <p className="text-black font-medium text-base mt-2">{price}</p>
        </div>
      </div>
    </Link>
  );
}
