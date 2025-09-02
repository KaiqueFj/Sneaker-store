"use client";

import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSneaker } from "../Sneakers/SneakerContext";
import Cart from "../cart/Cart";

export default function SneakerSelectedInformation({ sneaker }) {
  const { name, price, category, images, sizes } = sneaker;
  const [mainImage, setMainImage] = useState(images[0]);
  const [sneakerSize, setSneakerSize] = useState(sizes[0]);
  const { dispatch, state } = useSneaker();

  const addToCart = () => {
    const item = {
      id: sneaker.id,
      name,
      price,
      category,
      size: sneakerSize,
      image: mainImage,
    };
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };

  return (
    <div className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 p-8 items-baseline">
      {/* Left: Images */}
      <div className="flex flex-row gap-4">
        {/* Thumbnails in column */}
        <div className="flex flex-col gap-4">
          {images.map((imgSrc, idx) => (
            <Image
              key={idx}
              src={imgSrc}
              alt={`${name} thumbnail ${idx}`}
              width={100}
              height={100}
              onClick={() => setMainImage(imgSrc)}
              className={`object-contain bg-gray-100 p-2 cursor-pointer hover:opacity-80 rounded 
                ${mainImage === imgSrc ? "ring-2 ring-black" : ""}`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="relative h-[400px] sm:h-[500px]  md:h-[600px] min-w-[30rem] bg-gray-100 rounded-md mx-auto">
          <Image
            src={mainImage}
            alt={name}
            fill
            className="object-contain "
            priority
          />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col w-full gap-6 place-self-start">
        <div>
          <span className="text-gray-500 font-normal text-md">{category}</span>
          <h2 className="text-black font-bold text-3xl leading-tight">
            {name}
          </h2>
        </div>

        <span className="text-black font-semibold text-2xl">{`$${price}`}</span>

        {/* Sizes */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Select Size
          </p>
          <div className="grid grid-cols-4 w-fit gap-2">
            {sizes.map((size, idx) => (
              <button
                key={idx}
                className={`border h-12 w-20 font-medium border-gray-300 text-sm text-gray-700 rounded transition-colors hover:border-black ${
                  sneakerSize === size ? "ring-1 ring-primary-500" : ""
                }`}
                onClick={() => setSneakerSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col  gap-4">
          <button
            onClick={addToCart}
            className="flex flex-row font-semibold items-center h-14 justify-center bg-black w-full  text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Add to the cart
            <ShoppingCartIcon className="ml-2 h-5 w-5" />
          </button>

          <button className="flex gap-2 flex-row  w-full items-center h-14 justify-center border-primary-500/20 border-2  text-primary-500 px-4 rounded-full hover:bg-primary-500/10 transition hover:text-red-500">
            Favorite
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>

        <Cart />
      </div>
    </div>
  );
}
