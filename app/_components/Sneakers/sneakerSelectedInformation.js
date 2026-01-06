"use client";

import SneakerReviews from "@/app/_components/Sneakers/sneakerPageStructure/SneakerReviews";
import StarRating from "@/app/_components/star/StarRating";
import { createFavorite, removeFavorite } from "@/lib/data-service";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, LinkIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useSneaker } from "../../../context/SneakerContext";
import Cart from "../cart/Cart";

export default function SneakerSelectedInformation({ sneaker, reviews }) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  const {
    name,
    price,
    category,
    images,
    sizes,
    colors,
    gender,
    model,
    isFavorite,
    rating_avg,
    rating_count,
  } = sneaker;

  const [mainImage, setMainImage] = useState(images[0]);
  const [sneakerSize, setSneakerSize] = useState(sizes[0]);
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const { dispatch } = useSneaker();

  const goToReviews = () => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  };

  function handleFavorite(e) {
    e.preventDefault();

    if (!session?.user?.userId) {
      toast.error("Log in to favorite this product. Redirecting...");
      setTimeout(() => router.push("/login"), 2500);
      return;
    }

    const nextValue = !isFavoriteState;
    setIsFavoriteState(nextValue);

    startTransition(async () => {
      try {
        nextValue
          ? await createFavorite(sneaker.id)
          : await removeFavorite(sneaker.id);
      } catch {
        setIsFavoriteState(!nextValue);
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
    <section className="w-full max-w-[1440px] mx-auto lg:px-4 lg:px-12 py-10">
      {/* ================= MOBILE ================= */}
      <div className="flex flex-col  gap-10 lg:hidden">
        {/* INFO */}
        <div className="px-4">
          <h1 className="text-3xl font-semibold">{name}</h1>
          <p className="text-sm text-gray-500 mt-1">{category}</p>

          <div className="flex items-center gap-4 mt-3">
            <StarRating rating={rating_avg} />
            {rating_count > 0 && (
              <button
                onClick={goToReviews}
                className="text-sm underline text-gray-600"
              >
                Reviews ({rating_count})
              </button>
            )}
          </div>

          <p className="text-2xl font-medium mt-6">${price}</p>
        </div>

        {/* IMAGE */}
        <div className="relative px-0 aspect-square bg-[#f5f5f5] rounded-xl">
          <Image
            src={mainImage}
            alt={name}
            fill
            priority
            className="object-contain p-8"
          />
        </div>

        {/* THUMBNAILS */}
        <div className="flex justify-center gap-3">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt="thumbnail"
              width={72}
              height={72}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer rounded-lg border
                ${mainImage === img ? "border-black" : "border-gray-200"}`}
            />
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex px-4 flex-col gap-4">
          <button
            onClick={addToCart}
            className="h-14  px-6 py-3  rounded-full bg-black  text-white text-base font-medium tracking-wide transition hover:bg-black/70 active:scale-[0.99]"
          >
            Add to Bag
          </button>

          <button
            onClick={handleFavorite}
            className="h-14  px-6 py-3  rounded-full border border-primary-600/25 flex items-center justify-center text-base font-medium tracking-wide transition hover:bg-black/5 active:scale-[0.99] gap-2"
          >
            {isFavoriteState ? "Favorited" : "Favorite"}
            {isFavoriteState ? (
              <HeartSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartOutline className="w-6 h-6" />
            )}
          </button>
        </div>

        <Cart />

        <div id="reviews" className="pt-8 px-4 ">
          <SneakerReviews reviews={reviews} />
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex justify-center gap-6">
        {/* THUMBNAILS */}
        <div className="flex flex-col gap-2 mr-2">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${name} thumbnail ${idx}`}
              width={72}
              height={72}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer rounded-lg border
                ${
                  mainImage === img
                    ? "border-black"
                    : "border-gray-200 hover:border-black"
                }`}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="relative w-full max-w-[600px] aspect-square bg-[#f5f5f5] rounded-xl">
          <Image
            src={mainImage}
            alt={name}
            fill
            priority
            className="object-contain p-12"
          />
        </div>

        {/* INFO + ACTIONS + REVIEWS */}
        <div className="flex flex-col gap-10 max-w-lg">
          <div>
            <div className="flex items-center gap-2 justify-between">
              <h1 className="text-3xl font-semibold">{name}</h1>
              <LinkIcon className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer" />
            </div>

            <p className="text-sm text-gray-500 mt-1">{category}</p>

            <div className="flex items-center gap-4 mt-3">
              <StarRating rating={rating_avg} />
              {rating_count > 0 && (
                <button
                  onClick={goToReviews}
                  className="text-sm underline text-gray-600"
                >
                  Reviews ({rating_count})
                </button>
              )}
            </div>

            <p className="text-2xl font-medium mt-6">${price}</p>
          </div>

          {/* SIZE */}
          <div>
            <p className="text-sm font-medium mb-3">Select Size</p>
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSneakerSize(size)}
                  className={`h-12 rounded-md border
                    ${
                      sneakerSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-center items-center flex-col gap-4">
            <button
              onClick={addToCart}
              className="h-14 w-3/4 px-6 py-3  rounded-full bg-black  text-white text-base font-medium tracking-wide transition hover:bg-black/70 active:scale-[0.99]"
            >
              Add to Bag
            </button>

            <button
              onClick={handleFavorite}
              disabled={isPending}
              className="h-14 w-3/4 px-6 py-3  rounded-full border border-primary-600/25 flex items-center justify-center text-base font-medium tracking-wide transition hover:bg-black/5 active:scale-[0.99] gap-2"
            >
              {isFavoriteState ? "Favorited" : "Favorite"}
              {isFavoriteState ? (
                <HeartSolid className="w-6 h-6 text-red-500" />
              ) : (
                <HeartOutline className="w-6 h-6" />
              )}
            </button>
          </div>

          <Cart />

          <div id="reviews" className="pt-8 ">
            <SneakerReviews reviews={reviews} />
          </div>
        </div>
      </div>
    </section>
  );
}
