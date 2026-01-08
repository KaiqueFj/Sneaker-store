import { getSneakers } from "../../../../lib/data-service";
import Category from "../../../_components/HeaderPages/Category";
import Filter from "../../../_components/Sneakers/filter/filter";
import SneakersList from "../../../_components/Sneakers/sneakerList";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const pageCategory = await decodeURIComponent(category);

  return { title: `${pageCategory} Sneakers` };
}

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams?.order ?? "all";

  // decode category from URL
  const rawCategory = resolvedParams?.category || null;
  const category = rawCategory ? decodeURIComponent(rawCategory) : null;

  let sneakers = [];

  if (category) {
    const filterKey = ["men", "women"].includes(category.toLowerCase())
      ? "gender"
      : "model";

    sneakers = await getSneakers(filterKey, category);
  } else {
    sneakers = await getSneakers();
  }

  return (
    <div className="flex  justify-center h-auto min-h-screen">
      <div className="w-full flex flex-col gap-10 max-w-[1440px] mx-auto px-2 lg:px-10 box-border py-0 ">
        {/* Header */}
        <div className="flex items-center h- justify-between px-6 lg:px-12">
          <Category>
            {category ? `${category} sneakers` : "All sneakers"}
          </Category>
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
