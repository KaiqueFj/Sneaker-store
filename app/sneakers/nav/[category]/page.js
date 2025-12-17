import Category from "../../../_components/HeaderPages/Category";
import Filter from "../../../_components/Sneakers/filter/filter";
import SneakersList from "../../../_components/Sneakers/sneakerList";
import Spinner from "../../../_components/Spinner/Spinner";
import { Suspense } from "react";
import { getSneakers } from "../../../../lib/data-service";

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
    <div className="flex flex-col justify-center mx-auto gap-6 place-items-center">
      <div className="flex items-center justify-between w-3/4 sticky">
        <Category>
          {category ? `${category} sneakers` : "All sneakers"}
        </Category>
        <Filter />
      </div>
      <div className="flex flex-row justify-center w-3/4">
        <Suspense fallback={<Spinner />} key={filter}>
          <SneakersList filter={filter} sneakers={sneakers} />
        </Suspense>
      </div>
    </div>
  );
}
