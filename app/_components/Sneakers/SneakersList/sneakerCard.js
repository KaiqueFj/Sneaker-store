import Image from "next/image";
import React from "react";

export default function sneakerCard({ name, price, category, image }) {
  return (
    <div className="flex flex-row items-center justify-center ">
      <div>
        <Image src={image} alt={name} width={100} height={100} />
      </div>

      <div>
        <span>{name}</span>
        <span>{category}</span>
        <span>{price}</span>
      </div>
    </div>
  );
}
