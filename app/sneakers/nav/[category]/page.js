import React, { Suspense } from "react";
import SneakersList from "@/app/_components/Sneakers/sneakerList";
import Filter from "@/app/_components/Sneakers/filter/filter";
import Spinner from "@/app/_components/Spinner/Spinner";
import { getSneakers } from "@/app/_lib/data-service";
import Category from "@/app/_components/HeaderPages/Category";

export async function generateMetadata({ params }) {
  const pageCategory = decodeURIComponent(params.category);

  return { title: `${pageCategory} Sneakers` };
}

export default async function Page({ params, searchParams }) {
  const filter = searchParams?.order ?? "all";

  // decode category from URL
  const rawCategory = params?.category || null;
  const category = rawCategory ? decodeURIComponent(rawCategory) : null;

  let sneakers = [];
  if (category) {
    const filterKey = ["men", "women"].includes(category.toLowerCase())
      ? "gender"
      : "model";

    sneakers = await getSneakers(filterKey, category);
  } else {
    sneakers = await getSneakers(); // fallback: all sneakers
  }

  return (
    <div className="flex flex-col justify-center mx-auto gap-6 place-items-center">
      <div className="flex items-center justify-between w-3/4">
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
