import Cart from "@/app/_components/cart/Cart";
import StarRating from "@/app/_components/star/StarRating";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, LinkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function SneakerDesktopView({
  name,
  category,
  price,
  sizes,
  rating_avg,
  rating_count,
  images,
  description,
  mainImage,
  setMainImage,
  sneakerSize,
  setSneakerSize,
  isPending,
  isFavoriteState,
  addToCart,
  handleFavorite,
  goToReviews,
  children,
}) {
  return (
    <div className="hidden lg:flex justify-center gap-12 items-start">
      {/* LEFT — STICKY IMAGES */}
      <div className="flex gap-4 sticky  self-start">
        {/* THUMBNAILS */}
        <div className="flex flex-col gap-2">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${name} thumbnail ${idx}`}
              width={64}
              height={64}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer rounded-lg border transition
          ${
            mainImage === img
              ? "border-black"
              : "border-gray-200 hover:border-black"
          }`}
            />
          ))}
        </div>

        {/* MAIN IMAGE (FIXED HEIGHT) */}
        <div className="relative h-130 w-130 bg-[#f5f5f5] rounded-xl">
          <Image
            src={mainImage}
            alt={name}
            fill
            priority
            className="object-contain p-10"
          />
        </div>
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
                className="text-sm underline cursor-pointer text-gray-600"
              >
                View reviews ({rating_count})
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

          {/* Description */}
          <div className="mt-12 max-w-prose">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Product Details
            </h3>

            <p className="whitespace-pre-line text-sm leading-7 text-gray-700 [&>strong]:text-gray-900">
              {description}
            </p>
          </div>
        </div>

        {children}

        <Cart />
      </div>
    </div>
  );
}
