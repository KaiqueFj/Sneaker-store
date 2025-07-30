import Image from "next/image";
import Link from "next/link";

export default function SneakersCard({ name, image }) {
  return (
    <div className="flex flex-col items-center w-full bg-primary-700 rounded-md p-4">
      <Link href={`/`} className="w-full">
        <div className="relative w-full aspect-[4/5] ">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain -rotate-[25deg] translate-x-[-12%] translate-y-[-10%]"
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
