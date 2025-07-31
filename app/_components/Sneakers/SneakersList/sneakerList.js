import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SneakersList({ name, image, price, category, link }) {
  return (
    <Link href={link}>
      <div className="flex flex-col gap-4 p-1 rounded-md items-start transform transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div className="bg-primary-700/70 rounded-md">
          <Image src={image} alt="sneakers" width={500} height={500} />
        </div>
        <div className="flex flex-col">
          <span className="text-primary-500/80 font-medium text-md">
            {name}
          </span>
          <span className="text-primary-500/50 font-normal text-md">
            {category}
          </span>
          <span className="text-primary-500 font-semibold text-lg">
            {price}
          </span>
        </div>
      </div>
    </Link>
  );
}
