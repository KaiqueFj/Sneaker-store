"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SneakerImageCarousel({ images, name }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div
      ref={emblaRef}
      className="embla relative aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden"
    >
      {/* Slides */}
      <div className="embla__container flex">
        {images.map((img, index) => (
          <div key={index} className="embla__slide relative">
            <Image
              src={img}
              alt={`${name} image ${index + 1}`}
              fill
              priority={index === 0}
              className="object-contain p-8 pb-16"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition ${
              idx === currentIndex ? "bg-black" : "bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
