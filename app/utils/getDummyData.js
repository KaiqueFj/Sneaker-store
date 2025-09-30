import SneaksAPI from "sneaks-api";

const sneaks = new SneaksAPI();
const brand = "Nike"; // Only one brand for testing

export async function getSneakersFromApi() {
  // Fetch 25 sneakers from brand
  const products = await new Promise((resolve, reject) => {
    sneaks.getProducts(brand, 25, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

  const transformed = products.map((s) => ({
    name: s.shoeName,
    model: s.silhoutte || s.make || "Unknown",
    category: [s.brand],
    price: s.retailPrice || s.lowestResellPrice?.stockX || 0,
    images: s.imageLinks.length > 0 ? s.imageLinks : [s.thumbnail],
    colors: s.colorway ? s.colorway.split("/") : ["Unknown"],
    gender: ["unisex"], // default
    sizes: ["40", "41", "42", "43", "44"], // placeholder
  }));

  return transformed;
}
