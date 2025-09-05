import Image from "next/image";
import Link from "next/link";

export default function SneakerMainCard({ sneaker }) {
  const { images, model } = sneaker;

  return (
    <article className="group relative bg-primary-500/20 hover:shadow-md transition-shadow duration-300 w-[23rem] h-[30rem] flex-shrink-0 flex flex-col">
      <Link
        href={`/sneakers/nav/${model}`}
        className="flex flex-col items-center justify-between w-full h-full p-4"
        aria-label={`View ${model} collection`}
      >
        {/* Image */}
        <div className="relative w-full h-[20rem] flex items-center justify-center">
          <Image
            src={images[0]}
            alt={`${model} sneaker`}
            width={350}
            height={350}
            className="object-contain max-w-full max-h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center justify-center text-center mt-4">
          <h2 className="text-primary-500 font-semibold text-2xl tracking-tight group-hover:text-gray-800 transition-colors duration-300 leading-tight">
            {model}
          </h2>
          <div
            className="mt-1 h-0.5 w-0 group-hover:w-10 
             bg-gradient-to-r from-primary-500/40 to-primary-600 
             opacity-0 group-hover:opacity-100 
             transition-all duration-700 ease-in-out mx-auto"
          ></div>
        </div>
      </Link>
    </article>
  );
}
