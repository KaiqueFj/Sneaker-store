import { Suspense } from "react";
import { getSneakers } from "../../../../lib/data-service";
import Category from "../../../_components/HeaderPages/Category";
import Filter from "../../../_components/Sneakers/filter/filter";
import SneakersList from "../../../_components/Sneakers/sneakerList";
import Spinner from "../../../_components/Spinner/Spinner";

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
    <div className="flex flex-col mx-auto gap-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 lg:px-12">
        <Category>
          {category ? `${category} sneakers` : "All sneakers"}
        </Category>
        <Filter />
      </div>

      {/* Grid */}
      <div className="w-full px-6 lg:px-12">
        <Suspense fallback={<Spinner />} key={filter}>
          <SneakersList filter={filter} sneakers={sneakers} />
        </Suspense>
      </div>
    </div>
  );
}
