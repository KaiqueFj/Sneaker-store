import Cart from "@/app/_components/cart/Cart";
import StarRating from "@/app/_components/star/StarRating";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function SneakerMobileView({
  name,
  category,
  price,
  rating_avg,
  rating_count,
  images,
  mainImage,
  setMainImage,
  isFavoriteState,
  addToCart,
  handleFavorite,
  goToReviews,
}) {
  return (
    <div className="flex flex-col gap-10 lg:hidden">
      {/* INFO */}
      <div className="px-4">
        <h1 className="text-3xl font-semibold">{name}</h1>
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

      {/* IMAGE */}
      <div className="relative aspect-square bg-[#f5f5f5] rounded-xl">
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
            className={`cursor-pointer rounded-lg border ${
              mainImage === img ? "border-black" : "border-gray-200"
            }`}
          />
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex px-4 flex-col gap-4">
        <button
          onClick={addToCart}
          className="h-14 rounded-full bg-black text-white font-medium transition hover:bg-black/70"
        >
          Add to Bag
        </button>

        <button
          onClick={handleFavorite}
          className="h-14 rounded-full border flex items-center justify-center gap-2 transition hover:bg-black/5"
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
    </div>
  );
}
