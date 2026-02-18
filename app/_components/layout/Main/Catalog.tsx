import { getSneakers } from "@/services/sneakers-service";
import { ProductListItem } from "@/types/product";
import SneakerMainCard from "./SneakersMainPageCard";

export default async function Catalog() {
  const sneakers = await getSneakers();

  const byModel: Record<string, ProductListItem> = {};

  for (const sneaker of sneakers) {
    byModel[sneaker.model] = sneaker;
  }

  const uniqueSneakers = Object.values(byModel).slice(0, 10);

  return (
    <>
      <div className="flex flex-col items-center w-full gap-6 p-4 my-10">
        <p className="text-3xl text-primary-600 font-bold text-center">
          <span className="block">
            Uma coleção de tênis que pode fazer você se sentir como um campeão
          </span>
          <span className="block">E</span>
          <span className="block">alcançar um sonho</span>
        </p>
      </div>

      <div className="w-full max-w-full ">
        <div className="overflow-x-auto  scroll-smooth ">
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
