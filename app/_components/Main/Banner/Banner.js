import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="flex flex-col items-center w-full gap-6 p-4">
      <h1 className="text-5xl text-primary-500 font-extrabold text-center">
        Strive for greatness
      </h1>

      <div className="flex w-5/6">
        {/* Left Image */}
        <div className="relative w-1/2 h-[700px]  overflow-hidden">
          <Image
            src="/_assets/banners/mainBackground.jpg"
            alt="Main Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Image */}
        <div className="relative w-1/2 h-[700px]  overflow-hidden">
          <Image
            src="/_assets/banners/banner-2.jpg"
            alt="Secondary Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
