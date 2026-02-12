import { ProductListItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function SneakerMainCard({
  sneaker,
}: {
  sneaker: ProductListItem;
}) {
  const { images, model } = sneaker;

  return (
    <article
      className="group relative bg-gray-100 hover:shadow-md transition-shadow duration-300 
                 w-2/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
                 shrink-0 flex flex-col rounded-2xl overflow-hidden"
    >
      <Link
        href={`/sneakers/nav/${model}`}
        className="flex flex-col items-center justify-between w-full h-full p-4"
        aria-label={`View ${model} collection`}
      >
        {/* Image */}
        <div className="relative w-full aspect-square sm:aspect-3/2 flex items-center justify-center">
          <Image
            src={images[0]}
            alt={`${model} sneaker`}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center justify-center text-center mt-4 relative">
          <h2 className="text-primary-600 font-medium text-lg sm:text-xl md:text-2xl tracking-tight group-hover:text-primary-400 transition-colors duration-300 leading-tight">
            {model}
          </h2>
          <div
            className="after:absolute after:left-1/2 after:-bottom-1 after:h-0.5 after:w-0 
                       after:-translate-x-1/2 after:bg-primary-600 after:opacity-0 
                       after:transition-all after:duration-500 group-hover:after:w-14 group-hover:after:opacity-100 ease-in-out"
          ></div>
        </div>
      </Link>
    </article>
  );
}
