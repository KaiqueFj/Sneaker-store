import { getSneakersOnSale } from "../../../../lib/data-service";
import Category from "../../../_components/layout/HeaderPages/Category";
import Filter from "../../../_components/Sneakers/filter/filter";
import SneakersList from "../../../_components/Sneakers/sneakerList";

export async function generateMetadata() {
  return { title: ` Sneakers on sale ` };
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams?.order ?? "all";
  let sneakers = [];

  sneakers = await getSneakersOnSale();

  return (
    <div className="flex  justify-center h-auto min-h-screen">
      <div className="w-full flex flex-col gap-10 max-w-360 mx-auto px-2 lg:px-10 box-border py-0 ">
        {/* Header */}
        <div className="flex items-center h- justify-between px-6 lg:px-12">
          <Category>{`Sneakers on sale (${sneakers.length})`}</Category>

          <Filter />
        </div>

        {/* Grid */}
        <div className="flex justify-center lg:px-6 ">
          <SneakersList filter={filter} sneakers={sneakers} />
        </div>
      </div>
    </div>
  );
}
