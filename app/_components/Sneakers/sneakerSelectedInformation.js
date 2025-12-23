"use client";

import { createFavorite } from "@/lib/data-service";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useSneaker } from "../../../context/SneakerContext";
import Cart from "../cart/Cart";

export default function SneakerSelectedInformation({ sneaker }) {
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(false);

  const { name, price, category, images, sizes, colors, gender, model } =
    sneaker;
  const [mainImage, setMainImage] = useState(images[0]);
  const [sneakerSize, setSneakerSize] = useState(sizes[0]);
  const { dispatch } = useSneaker();

  function handleFavorite() {
    setIsFavorite(!isFavorite);

    startTransition(async () => {
      try {
        await createFavorite(sneaker.id);
      } catch (error) {
        setIsFavorite(false);
        console.error(error);
      }
    });
  }

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: sneaker.id,
        name,
        price,
        category,
        colors,
        gender,
        model,
        size: sneakerSize,
        image: mainImage,
      },
    });
  };

  return (
    <div className="min-h-[80vh] w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 p-4 sm:p-6 lg:p-12 items-start justify-center">
      {/* Mobile: Product Info above image */}
      <div className="block lg:hidden text-center">
        <span className="text-gray-500 font-normal text-sm sm:text-base">
          {category}
        </span>
        <h2 className="text-gray-900 font-bold text-2xl sm:text-3xl leading-tight mt-1">
          {name}
        </h2>

        <span className="text-gray-900 font-semibold text-xl sm:text-2xl">
          ${price}
        </span>
      </div>

      {/* Left: Images */}
      <div className="flex flex-col items-center lg:items-center gap-6 w-full">
        {/* Main Image */}
        <div className="relative w-full sm:w-full md:w-112.5 lg:w-137.5 aspect-square bg-gray-100 rounded-md flex justify-center">
          <Image
            src={mainImage}
            alt={name}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* Thumbnails */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {images.map((imgSrc, idx) => (
            <Image
              key={idx}
              src={imgSrc}
              alt={`${name} thumbnail ${idx}`}
              width={80}
              height={80}
              onClick={() => setMainImage(imgSrc)}
              className={`object-contain bg-gray-100 p-2 cursor-pointer hover:opacity-80 rounded-md transition 
                ${mainImage === imgSrc ? "ring-2 ring-black" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info (Desktop) */}
      <div className="flex flex-col gap-6 max-w-105 mx-auto lg:mx-0 w-full">
        {/* Product title & category (hidden on small screens) */}
        <div className="hidden lg:block">
          <span className="text-gray-500 font-normal text-sm sm:text-base">
            {category}
          </span>
          <h2 className="text-gray-900 font-bold text-3xl leading-tight mt-1">
            {name}
          </h2>

          {/* Price */}
          <span className="text-gray-900 font-semibold text-2xl mt-2 block">
            ${price}
          </span>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Select Size
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {sizes.map((size, idx) => (
              <button
                key={idx}
                onClick={() => setSneakerSize(size)}
                className={`border h-10 sm:h-12 w-full font-medium border-gray-300 text-sm rounded transition-colors 
                  hover:border-black ${
                    sneakerSize === size ? "ring-1 ring-black" : ""
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={addToCart}
            className="flex items-center justify-center font-semibold bg-black text-white px-6 py-3 rounded-full w-full sm:w-50 hover:bg-gray-800 transition"
          >
            Add to Cart
            <ShoppingCartIcon className="ml-2 h-5 w-5" />
          </button>

          <button
            onClick={handleFavorite}
            disabled={isPending}
            className="flex items-center justify-center gap-2 border-2 border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Favorite
            <HeartIcon
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
        </div>

        <Cart />
      </div>
    </div>
  );
}
