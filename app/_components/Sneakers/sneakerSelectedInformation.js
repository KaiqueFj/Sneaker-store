"use client";

import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";

export default function SneakerSelectedInformation({ sneaker }) {
  const { name, price, category, images, sizes } = sneaker;

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 p-8 items-center">
      {/* Left: Images */}
      <div className="flex flex-col gap-4 items-end">
        {/* Main Image */}
        <Image
          src={mainImage}
          alt={name}
          width={700}
          height={700}
          className="object-contain bg-gray-100 p-6 w-full max-w-[550px]"
          priority
        />

        {/* Thumbnails */}
        <div className="flex items-start gap-4">
          {images.map((imgSrc, idx) => (
            <Image
              key={idx}
              src={imgSrc}
              alt={`${name} thumbnail ${idx}`}
              width={120}
              height={120}
              onClick={() => setMainImage(imgSrc)}
              className="object-contain bg-gray-100 p-2 cursor-pointer hover:opacity-80"
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col gap-6 self-baseline">
        <div>
          <span className="text-gray-500 font-normal text-md">{category}</span>
          <h2 className="text-black font-bold text-4xl leading-tight">
            {name}
          </h2>
        </div>

        <span className="text-black font-semibold text-2xl">{price}</span>

        {/* Sizes */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Select Size
          </p>
          <div className="grid grid-cols-4 gap-[4px]">
            {sizes.map((size, idx) => (
              <button
                key={idx}
                className="border h-12 w-20 font-medium border-gray-300 text-sm text-gray-700 rounded transition-colors hover:border-black"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="flex flex-row items-center justify-center bg-black w-4/4 h-12 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
            Add to the cart
            <ShoppingCartIcon className="ml-2 h-5 w-5" />
          </button>

          <button className="flex flex-row items-center justify-center bg-black text-white px-4 rounded-lg hover:bg-gray-800 transition hover:text-red-500">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
