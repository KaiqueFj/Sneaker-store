import Cart from "@/app/_components/cart/Cart";
import SneakerDetailsModal from "@/app/_components/Sneakers/modal/SneakerDetailsModal";
import SneakerImageCarousel from "@/app/_components/Sneakers/sneakerPageStructure/SneakerImageCarousel";
import StarRating from "@/app/_components/star/StarRating";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, LinkIcon } from "@heroicons/react/24/solid";

export default function SneakerMobileView({ product, ui, actions, meta }) {
  const {
    name,
    category,
    price,
    images,
    sizes,
    rating_avg,
    rating_count,
    intro,
    benefits,
    description,
  } = product;

  const { sneakerSize, isDescriptionOpen } = ui;

  const {
    setSneakerSize,
    setIsDescriptionOpen,
    addToCart,
    handleFavorite,
    goToReviews,
  } = actions;

  const { isFavoriteState, currentUrl, toast } = meta;

  return (
    <div className="flex flex-col gap-10 lg:hidden">
      {/* INFO */}
      <div className="px-4">
        <div className="flex items-center gap-2 justify-between">
          <h1 className="text-3xl font-semibold">{name}</h1>
          <LinkIcon
            className="w-6.5 h-6.5 text-primary-600 font-semibold cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(currentUrl);
              toast.success("Link copied!");
            }}
          />
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

      {/* IMAGE */}
      <SneakerImageCarousel images={images} name={name} />

      {/* SIZE */}
      <div className="px-4">
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

      {/* Description */}
      <div className="mt-12 px-4 max-w-prose">
        <h3 className="mb-4 text-xl font-semibold text-primary-600">
          Description
        </h3>

        <p className="whitespace-pre-line text-lg font-medium leading-7 text-primary-600 [&>strong]:text-primary-600">
          {intro}
        </p>

        <p>
          {benefits && (
            <button
              onClick={() => setIsDescriptionOpen(true)}
              className="mt-2 text-lg underline font-semibold text-primary-600 hover:text-gray-600"
            >
              Read more
            </button>
          )}
        </p>

        {isDescriptionOpen && (
          <SneakerDetailsModal
            description={description}
            isDescriptionOpen={isDescriptionOpen}
            setIsDescriptionOpen={setIsDescriptionOpen}
          />
        )}
      </div>

      <Cart />
    </div>
  );
}
