import { getNewestSneakersServiceAction } from '@/actions/sneakers-action';
import Category from '@/app/_components/layout/HeaderPages/Category';
import Filter from '@/app/_components/products/Filter/filter';
import SneakersList from '@/app/_components/products/List/sneakerList';

export async function generateMetadata() {
  return { title: `New & Featured Sneakers` };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams?.order ?? 'Todos';
  let sneakers = [];

  sneakers = await getNewestSneakersServiceAction();

  return (
    <div className="flex  justify-center h-auto min-h-screen">
      <div className="w-full flex flex-col gap-10 max-w-360 mx-auto px-2 lg:px-10 box-border py-0 ">
        <div className="flex items-center  justify-between py-4 px-6 lg:px-12">
          <Category>{`Tênis adicionados recentemente (${sneakers.length})`}</Category>
          <Filter />
        </div>

        <div className="flex justify-center lg:px-6 ">
          <SneakersList filter={filter} sneakers={sneakers} />
        </div>
      </div>
    </div>
  );
}
