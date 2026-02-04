import Category from "@/app/_components/layout/HeaderPages/Category";
import Filter from "@/app/_components/products/Filter/filter";
import SneakersList from "@/app/_components/products/List/sneakerList";
import { getNewestSneakers } from "@/lib/data-service";

export async function generateMetadata() {
  return { title: `New & Featured Sneakers` };
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams?.order ?? "all";
  let sneakers = [];

  sneakers = await getNewestSneakers();

  return (
    <div className="flex flex-col justify-center mx-auto gap-6 place-items-center">
      <div className="flex items-center justify-between w-3/4 sticky">
        <Category>{`New & Featured Sneakers (${sneakers.length})`}</Category>
        <Filter />
      </div>
      <div className="flex justify-center lg:px-6 ">
        <SneakersList filter={filter} sneakers={sneakers} />
      </div>
    </div>
  );
}
