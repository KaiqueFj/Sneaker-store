import { getAllSneakers, getSneakers } from "@/app/_lib/data-service";
import SneakerMainCard from "./SneakersMainPageCard";

export default async function Catalog() {
  const sneakers = await getSneakers();

  const uniqueSneakers = Object.values(
    sneakers.reduce((acc, sneaker) => {
      if (!acc[sneaker.model]) acc[sneaker.model] = sneaker;
      return acc;
    }, {})
  );
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

      <div className="flex overflow-x-scroll h-fit gap-4 w-full py-2">
        {uniqueSneakers.map((sneaker) => (
          <SneakerMainCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </div>
    </>
  );
}
