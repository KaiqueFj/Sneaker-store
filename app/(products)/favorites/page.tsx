import SneakersList from "@/app/_components/products/List/sneakerList";
import { getFavorites } from "@/services/favorite-service";

export default async function page() {
  const favorites = await getFavorites();

  return (
    <div className="flex flex-col items-center mx-auto justify-center gap-4">
      <h2 className="text-2xl font-bold">Favoritos</h2>

      <div className="flex flex-row justify-center w-3/4">
        <SneakersList filter="Todos" sneakers={favorites} />
      </div>
    </div>
  );
}
