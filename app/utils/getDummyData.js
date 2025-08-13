export function getDummySneakers() {
  const baseUrl =
    "https://xdwfpeoyyofrxkqdlpad.supabase.co/storage/v1/object/public/sneakers/sneakers/";

  return [
    {
      name: "Air Jordan Red",
      color: "Red/White",
      gender: "Men",
      sizes: [40, 41, 42, 43],
      price: "$199.99",
      images: [`${baseUrl}airJordanRed.png`],
    },
    {
      name: "Nike Air Force 1",
      color: "White",
      gender: "Women",
      sizes: [37, 38, 39],
      price: "$129.99",
      images: [`${baseUrl}airforce1.jpg`],
    },
    {
      name: "Air Jordan Banned",
      color: "Black/Red",
      gender: "Men",
      sizes: [40, 41, 42],
      price: "$219.99",
      images: [`${baseUrl}airJordan-banned.png`],
    },
    {
      name: "Air Jordan 11 Concord",
      color: "White/Black",
      gender: "Men",
      sizes: [41, 42, 43, 44],
      price: "$249.99",
      images: [`${baseUrl}airJordan11-concord.png`],
    },
  ];
}
