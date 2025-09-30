import React, { Suspense } from "react";
import SneakersList from "@/app/_components/Sneakers/sneakerList";
import Filter from "@/app/_components/Sneakers/filter/filter";
import Spinner from "@/app/_components/Spinner/Spinner";
import { getNewestSneakers, getSneakersOnSale } from "@/app/_lib/data-service";
import Category from "@/app/_components/HeaderPages/Category";

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
      <div className="flex items-center justify-between w-3/4">
        <Category>{`New & Featured Sneakers (${sneakers.length})`}</Category>
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
