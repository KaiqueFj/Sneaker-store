import Cart from "@/app/_components/cart/Cart";
import SneakerReviews from "@/app/_components/Sneakers/sneakerPageStructure/SneakerReviews";
import StarRating from "@/app/_components/star/StarRating";
import {
  HeartIcon,
  LinkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function SneakerInformationComponent({
  name,
  price,
  category,
  images,
  sizes,
  rating_avg,
  rating_count,
  mainImage,
  setMainImage,
  sneakerSize,
  setSneakerSize,
  addToCart,
  handleFavorite,
  isFavorite,
  isPending,
  reviews,
}) {
  return (
    <div className="min-h-[80vh] w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 p-4 sm:p-6 lg:p-12">
      {/* Mobile header */}
      <div className="flex flex-col gap-2 lg:hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-primary-600">
            Sneaker {name}
          </h2>
          <LinkIcon className="h-8 w-8 text-primary-600" />
        </div>

        <span className="text-primary-600">{category}</span>

        <div className="flex gap-4 mt-2">
          <StarRating rating={rating_avg} />
          <span className="text-primary-600 text-sm underline">
            {rating_count > 0
              ? `Read reviews (${rating_count})`
              : "No reviews yet"}
          </span>
        </div>

        <span className="text-xl font-semibold">${price}</span>
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

        <div className="flex gap-3 flex-wrap justify-center">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt=""
              width={80}
              height={80}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer rounded-md bg-gray-100 p-2 ${
                mainImage === img ? "ring-2 ring-black" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop info */}
      <div className="flex flex-col gap-6">
        <div className="hidden lg:block">
          <h2 className="text-3xl font-bold">Sneaker {name}</h2>
          <span className="text-gray-500">{category}</span>

          <div className="flex gap-4 mt-2">
            <StarRating rating={rating_avg} />
            <span className="underline text-sm">
              {rating_count > 0
                ? `Read reviews (${rating_count})`
                : "No reviews yet"}
            </span>
          </div>

          <span className="block mt-4 text-2xl font-semibold">${price}</span>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-sm font-semibold mb-2">Select Size</p>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSneakerSize(size)}
                className={`border rounded h-10 ${
                  sneakerSize === size ? "ring-1 ring-black" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={addToCart}
            className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2"
          >
            Add to Cart <ShoppingCartIcon className="h-5 w-5" />
          </button>

          <button
            onClick={handleFavorite}
            disabled={isPending}
            className="border px-6 py-3 rounded-full flex items-center gap-2"
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
        <SneakerReviews reviews={reviews} />
      </div>
    </div>
  );
}
