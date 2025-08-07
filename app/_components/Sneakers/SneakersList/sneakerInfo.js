import Image from "next/image";
import React from "react";

export default function SneakerInfo({ name, price, category, image }) {
  return (
    <div className="w-full min-h-[80vh] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 p-8 items-center">
      {/* Left: Image */}
      <div className="flex justify-self-end items-center bg-primary-700/60 rounded-md h-[552px] w-md">
        <Image
          src={image}
          alt="sneakers"
          width={500}
          height={100}
          className="object-contain translate-y-[-15%]"
          priority
        />
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-center gap-6">
        <div>
          <span className="text-primary-500/50 font-normal text-md">
            {category}
          </span>
          <h2 className="text-primary-500/80 font-bold text-4xl leading-tight">
            {name}
          </h2>
        </div>

        <span className="text-primary-500 font-semibold text-2xl">{price}</span>

        <div>
          <p className="text-sm font-semibold text-primary-500 mb-2">
            Select Size
          </p>
          <div className="grid grid-cols-6 gap-2">
            {[
              "33.5",
              "34",
              "35",
              "35.5",
              "36",
              "37",
              "38",
              "39",
              "39.5",
              "40",
              "40.5",
              "41",
              "42",
              "42.5",
              "43",
              "43.5",
              "44",
              "45",
              "45.5",
              "46",
              "46.5",
              "47",
              "47.5",
              "48",
              "49",
              "50",
            ].map((size, idx) => (
              <button
                key={idx}
                className="border border-gray-300 text-sm text-gray-700 rounded px-2 py-1 hover:border-black"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="mt-4 bg-primary-500 w-2/4 text-white px-6 py-2 rounded-lg hover:bg-primary-500/50 transition">
          Add to cart
        </button>
      </div>
    </div>
  );
}
