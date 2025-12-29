"use client";

import { createFavorite } from "@/lib/data-service";
import {
  HeartIcon as HeartOutline,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useSneaker } from "../../../context/SneakerContext";
import Cart from "../cart/Cart";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SneakerSelectedInformation({ sneaker }) {
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(false);

  const { name, price, category, images, sizes, colors, gender, model } =
    sneaker;

  const [mainImage, setMainImage] = useState(images[0]);
  const [sneakerSize, setSneakerSize] = useState(sizes[0]);

  const { dispatch } = useSneaker();
  const { data: session } = useSession();
  const router = useRouter();

  function handleFavorite() {
    if (!session?.user?.userId) {
      toast.error(
        "You must log in first to add favorites. Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 3000);

      return;
    }

    const nextValue = !isFavorite;
    setIsFavorite(nextValue);

    startTransition(async () => {
      try {
        await createFavorite(sneaker.id);
      } catch {
        setIsFavorite(!nextValue);
      }
    });
  }

  function addToCart() {
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
  }

  return (
    <div className="min-h-[80vh] w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 p-4 sm:p-6 lg:p-12 items-start">
      {/* Mobile header */}
      <div className="block lg:hidden text-center">
        <span className="text-gray-500 text-sm">{category}</span>
        <h2 className="text-gray-900 font-bold text-2xl mt-1">{name}</h2>
        <span className="text-gray-900 font-semibold text-xl">${price}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full aspect-square bg-gray-100 rounded-md">
          <Image
            src={mainImage}
            alt={name}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${name} ${idx}`}
              width={80}
              height={80}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer bg-gray-100 p-2 rounded-md transition
                ${mainImage === img ? "ring-2 ring-black" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6 max-w-105 mx-auto w-full">
        <div className="hidden lg:block">
          <span className="text-gray-500 text-sm">{category}</span>
          <h2 className="text-gray-900 font-bold text-3xl mt-1">{name}</h2>
          <span className="text-gray-900 font-semibold text-2xl block mt-2">
            ${price}
          </span>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Select Size
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSneakerSize(size)}
                className={`border h-10 rounded font-medium transition
                  ${
                    sneakerSize === size
                      ? "ring-1 ring-black"
                      : "border-gray-300 hover:border-black"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={addToCart}
            className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
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
            {isFavorite ? (
              <HeartSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartOutline className="h-5 w-5" />
            )}
          </button>
        </div>

        <Cart />
      </div>
    </div>
  );
}
