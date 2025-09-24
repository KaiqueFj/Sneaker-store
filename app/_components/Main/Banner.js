import Image from "next/image";
import React from "react";

export default function Banner() {
  const bannerImages = [
    {
      label: "Main banner 1",
      src: "/_assets/banners/mainBackground.jpg",
    },
    {
      label: "Main banner 2",
      src: "/_assets/banners/banner-2.jpg",
    },
  ];

  return (
    <div className="flex flex-col  w-full gap-6">
      <h1 className="text-5xl text-primary-600 font-extrabold text-center">
        Strive for greatness
      </h1>

      <div className="flex flex-col lg:flex-row  w-full lg:w-full ">
        {bannerImages.map((image) => (
          <div
            key={image.label}
            className="relative sm:w-full lg:w-full h-[700px]"
          >
            <Image
              src={image.src}
              alt={image.label}
              fill
              className="object-cover "
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
