import Image from "next/image";
import Link from "next/link";

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
      subtitle: "Sinta o poder do Jordan",
      category: "Air jordan 4",
      description: "Entre na grandeza com a edição branca do Air Jordan 4.",
      href: "/sneakers/nav/air jordan 4",
    },
    {
      label: "Second banner image 2",
      src: "/_assets/second-banner/airJordan1-blackRed.jpg",
      subtitle: "Seja como Mike",
      category: "Air jordan 1",
      description: "Experimente o prazer do Air Jordan 1 preto/vermelho.",
      href: "/sneakers/nav/air jordan 1",
    },
    {
      label: "Second banner image 3",
      src: "/_assets/second-banner/nike-dunk.jpg",
      category: "Nike Dunk",
      subtitle: "Sinta a energia do Dunk",
      description:
        "Liberte seu estilo com o Nike Dunk, um verdadeiro ícone das ruas.",
      href: "/sneakers/nav/Nike dunk",
    },
    {
      label: "Second banner image 4",
      src: "/_assets/second-banner/air-jordan11.jpg",
      subtitle: "Air Jordan 11",
      category: "Voe como o vento",
      description:
        "Experimente o lendário Air Jordan 11, um clássico atemporal que voa com estilo e performance.",
      href: "/sneakers/nav/air jordan 11",
    },
  ];

  return (
    <section className="w-full">
      {/* Headline */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
          LUTE PELA <span className="text-primary-600">GRANDEZA</span>
        </h1>
        <p className="mt-4 text-center text-gray-500 text-lg">
          Equipamentos de performance feito para aqueles que nunca se contentam.
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
                {index === 0 ? "Treine Mais Forte." : "Mova-se Mais Rápido."}
              </h2>

              <p className="mt-3 text-sm md:text-base text-gray-200 max-w-sm">
                {index === 0
                  ? "Projetado para força, resistência e performance."
                  : "Projetado para velocidade, agilidade e controle."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Second banner title */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
          ÍCONES QUE <span className="text-primary-600">DEFINEM O JOGO</span>
        </h1>
        <p className="mt-4 text-center text-gray-500 text-lg">
          Tênis lendários e essenciais de performance, redefinidos.
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

              <Link
                href={banner.href}
                className="mt-6 w-fit bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition"
              >
                Compre Agora
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
