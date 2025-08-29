import { getAllSneakers, getSneakers } from "@/app/_lib/data-service";
import SneakerMainCard from "./SneakersMainPageCard";

export default async function Catalog() {
  const sneakers = await getSneakers();

  const uniqueSneakers = Object.values(
    sneakers.reduce((acc, sneaker) => {
      if (!acc[sneaker.model]) acc[sneaker.model] = sneaker;
      return acc;
    }, {})
  ).slice(0, 10);
  return (
    <>
      <div className="flex flex-col items-center w-full gap-6 p-4 my-10">
        <p className="text-3xl text-primary-500 font-bold text-center">
          <span className="block">
            A collection of sneakers that can make you feel like a champion
          </span>
          <span className="block">And</span>
          <span className="block">achieve a dream</span>
        </p>
      </div>

      <div className="w-full max-w-full mx-auto px-4">
        <div className="overflow-x-auto overflow-y-hidden">
          <div className="flex gap-6 pb-4 min-w-max">
            {uniqueSneakers.map((sneaker) => (
              <SneakerMainCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
