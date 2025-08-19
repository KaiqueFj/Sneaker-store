import React, { Suspense } from "react";
import SneakersList from "@/app/_components/Sneakers/sneakerList";
import Filter from "@/app/_components/Sneakers/filter/filter";
import Spinner from "@/app/_components/Spinner/Spinner";
import { getSneakers } from "@/app/_lib/data-service";
import Category from "@/app/_components/HeaderPages/Category";

export async function generateMetadata({ params }) {
  const pageCategory = await params.category;

  return { title: `${pageCategory} Sneakers` };
}

export default async function page({ params, searchParams }) {
  const paramsOrder = await searchParams;
  const filter = paramsOrder?.order ?? "all";
  const sneakers = await getSneakers(params.category);

  return (
    <div className="flex flex-col justify-center mx-auto gap-6 place-items-center">
      <div className="flex items-center justify-between w-3/4 ">
        <Category>{`${params.category} sneakers`}</Category>
        <Filter />
      </div>
      <div className="flex flex-row justify-center w-3/4">
        <Suspense fallback={<Spinner />} key={filter}>
          <SneakersList filter={filter} sneakers={sneakers} key={sneakers.id} />
        </Suspense>
      </div>
    </div>
  );
}
