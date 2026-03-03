import { getFavoritesAction } from '@/actions/favorite-action';
import SneakersList from '@/app/_components/products/List/sneakerList';

export default async function page() {
  const favorites = await getFavoritesAction();

  return (
    <div className="flex  justify-center h-auto min-h-screen">
      <div className="w-full flex flex-col gap-10 max-w-360 mx-auto px-2 lg:px-10 box-border py-4 ">
        {/* Header */}
        <h2 className="text-2xl font-bold">Favoritos</h2>
        <div className="flex justify-center lg:px-6 ">
          <SneakersList filter="Todos" sneakers={favorites} />
        </div>
      </div>
    </div>
  );
}
