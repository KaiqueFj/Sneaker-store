import Image from "next/image";

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

  const bannerImages2 = [
    {
      label: "Second banner image ",
      src: "/_assets/second-banner/airJordan4-white.jpg",
      subtitle: "Feel the power of Jordan",
      description: "Step into greatness with the Air Jordan 4 white edition.",
    },
    {
      label: "Second banner image 2",
      src: "/_assets/second-banner/airJordan1-blackRed.jpg",
      subtitle: "Be like Mike",
      description:
        "Experience the thrill of the Air Jordan 1 black/red edition.",
    },
    {
      label: "Second banner image 3",
      src: "/_assets/second-banner/runningShoes.jpg",
      subtitle: "Running Shoes",
      description: "Step into the world of running with the Running Shoes.",
    },
    {
      label: "Second banner image 4",
      src: "/_assets/second-banner/sportPhotoshoot.jpg",
      subtitle: "Performance Gear",
      description:
        "Elevate your game with our performance gear, designed for champions.",
    },
  ];

  return (
    <section className="w-full">
      {/* Headline */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
          STRIVE FOR <span className="text-primary-600">GREATNESS</span>
        </h1>
        <p className="mt-4 text-center text-gray-500 text-lg">
          Performance gear built for those who never settle.
        </p>
      </div>

      {/* Banner */}
      <div className="flex flex-col lg:flex-row w-full">
        {bannerImages.map((image, index) => (
          <div
            key={image.label}
            className="group relative w-full h-130 lg:h-250 overflow-hidden"
          >
            {/* Image */}
            <Image
              src={image.src}
              alt={image.label}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-md">
                {index === 0 ? "Train Harder." : "Move Faster."}
              </h2>

              <p className="mt-3 text-sm md:text-base text-gray-200 max-w-sm">
                {index === 0
                  ? "Designed for strength, endurance and performance."
                  : "Engineered for speed, agility and control."}
              </p>

              <button className="mt-6 w-fit bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Second banner title */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
          ICONS THAT <span className="text-primary-600">DEFINE THE GAME</span>
        </h1>
        <p className="mt-4 text-center text-gray-500 text-lg">
          Legendary sneakers and performance essentials, redefined.
        </p>
      </div>

      {/* Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {bannerImages2.map((banner, index) => (
          <div
            key={banner.label}
            className="group relative w-full h-100 lg:h-220 overflow-hidden"
          >
            {/* Image */}
            <Image
              src={banner.src}
              alt={banner.label}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-md">
                {banner.subtitle}
              </h2>

              <p className="mt-3 text-sm md:text-base text-gray-200 max-w-sm">
                {banner.description}
              </p>

              <button className="mt-6 w-fit bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
