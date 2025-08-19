export function getDummySneakers() {
  const baseUrl =
    "https://xdwfpeoyyofrxkqdlpad.supabase.co/storage/v1/object/public/sneakers/sneakers/";

  return [
    {
      id: 1,
      name: "Air Max DN",
      price: 189.99,
      gender: ["men", "women", "unisex"],
      category: ["men"],
      images: [
        `${baseUrl}air-max-dn.avif`,
        `${baseUrl}air-max-dn-up.avif`,
        `${baseUrl}air-max-dn-full.avif`,
      ],
      colors: ["Black", "White", "Blue"],
      sizes: ["40", "41", "42", "43"],
    },
    {
      id: 2,
      name: "Air Jordan 4 Retro white cement",
      price: 259.99,
      gender: ["men", "women", "unisex"],
      category: ["men"],
      images: [
        `${baseUrl}airJordan4-white-cement-.jpg`,
        `${baseUrl}airJordan4-white-cement-up.jpg`,
        `${baseUrl}airJordan4-white-cement-full.jpg`,
      ],
      colors: ["Red", "Black", "White"],
      sizes: ["40", "41", "42", "43", "44"],
    },
    {
      id: 3,
      name: "Nike Dunk Baroque brown",
      price: 169.99,
      gender: ["men", "women", "unisex"],
      category: ["men"],
      images: [
        `${baseUrl}nike-dunk-low-baroque-brown.avif`,
        `${baseUrl}nike-dunk-low-baroque-brown-up.avif`,
        `${baseUrl}nike-dunk-low-baroque-brown-full.avif`,
      ],
      colors: ["Black", "White"],
      sizes: ["39", "40", "41", "42"],
    },
    {
      id: 4,
      name: "Kobe 8 proto",
      price: 239.99,
      gender: ["men", "women", "unisex"],
      category: ["men"],
      images: [
        `${baseUrl}kobe8-proto.avif`,
        `${baseUrl}kobe8-proto-up.avif`,
        `${baseUrl}kobe8-proto-full.avif`,
      ],
      colors: ["Black", "Gold"],
      sizes: ["41", "42", "43", "44"],
    },
    {
      id: 5,
      name: "Air jordan 11 low Bred",
      price: 229.99,
      gender: ["men"],
      category: ["men"],
      images: [
        `${baseUrl}airJordan11-low-bred.avif`,
        `${baseUrl}airJordan11-low-bred-up.avif`,
        `${baseUrl}airJordan11-low-bred-full.avif`,
      ],
      colors: ["red/black", "Black"],
      sizes: ["40", "41", "42", "43"],
    },
    {
      id: 6,
      name: "Nike Dunk Low Panda",
      price: 149.99,
      gender: ["women"],
      category: ["women"],
      images: [
        `${baseUrl}dunkLow-panda.avif`,
        `${baseUrl}dunkLow-panda-up.avif`,
        `${baseUrl}dunkLow-panda-full.avif`,
      ],
      colors: ["black/white"],
      sizes: ["36", "37", "38", "39"],
    },
    {
      id: 7,
      name: "Air Jordan 4 RM",
      price: 179.99,
      gender: ["women"],
      category: ["women"],
      images: [
        `${baseUrl}airJordan4-rm.avif`,
        `${baseUrl}airJordan4-rm-up.avif`,
        `${baseUrl}airJordan4-rm-full.avif`,
      ],
      colors: ["pink", "green"],
      sizes: ["36", "37", "38", "39", "40"],
    },
    {
      id: 8,
      name: "Air Jordan 1 low gray",
      price: 169.99,
      gender: ["women"],
      category: ["women"],
      images: [
        `${baseUrl}airJordan-1-low-grey.avif`,
        `${baseUrl}airJordan-1-low-grey-up.avif`,
        `${baseUrl}airJordan-1-low-grey-full.avif`,
      ],
      colors: ["Pink", "White"],
      sizes: ["35", "36", "37", "38", "39"],
    },
  ];
}
