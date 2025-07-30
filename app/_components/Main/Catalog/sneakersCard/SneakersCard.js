import Image from "next/image";
import Link from "next/link";
export default function SneakersCard({ name, image }) {
  return (
    <div className="flex flex-col items-center w-full bg-primary-700 rounded-md p-4 transform transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="relative w-28 sm:w-32 md:w-40 lg:w-32 aspect-square">
        <Image
          src="/_assets/logo/store-logo.png"
          alt="sneakers logo"
          fill
          className="object-contain"
        />
      </div>

      <Link href={`/`} className="w-full group">
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain -rotate-[25deg] translate-x-[-12%] translate-y-[-10%] transition-transform duration-500 ease-in-out hover:animate-float"
            priority
          />
        </div>
      </Link>

      <p className="text-black text-4xl sm:text-2xl font-semibold mt-4 text-center">
        {name}
      </p>
    </div>
  );
}
