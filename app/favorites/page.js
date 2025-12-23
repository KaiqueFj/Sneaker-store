import SneakersList from "@/app/_components/Sneakers/sneakerList";
import { getFavorites } from "@/lib/data-service";

export default async function page() {
  const favorites = await getFavorites();
  console.log(favorites);
  return (
    <div className="flex flex-col  items-center mx-auto justify-center gap-4">
      <h2 className="text-2xl font-bold">Favorites</h2>
      <div className="flex flex-row justify-center w-3/4">
        <SneakersList filter="all" sneakers={favorites} />
      </div>
    </div>
  );
}
