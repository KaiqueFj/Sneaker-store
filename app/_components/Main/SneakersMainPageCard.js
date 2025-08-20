import Image from "next/image";
import Link from "next/link";
export default function SneakerMainCard({ sneaker }) {
  const { images, model } = sneaker;

  return (
    <div className="flex flex-col items-center w-full bg-primary-700 rounded-md p-4 transform transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="relative w-28 sm:w-32 md:w-40 lg:w-32 aspect-square">
        <Link href={`/sneakers/nav/${model}`} className="w-full group">
          <div className="relative w-full aspect-[4/5] b overflow-hidden">
            <Image
              src={images[0]}
              alt={model}
              fill
              className="object-contain  -rotate-[25deg] translate-x-[-12%] translate-y-[-5%] transition-transform duration-500 ease-in-out hover:animate-float"
              priority
            />
          </div>
        </Link>
        <p className="text-black text-4xl sm:text-2xl font-semibold mt-4 text-center">
          {model}
        </p>
      </div>
    </div>
  );
}
