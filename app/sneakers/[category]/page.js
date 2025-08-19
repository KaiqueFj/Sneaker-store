import React, { Suspense } from "react";
import SneakersList from "@/app/_components/Sneakers/sneakerList";
import Filter from "@/app/_components/Sneakers/filter/filter";
import Spinner from "@/app/_components/Spinner/Spinner";
import { getSneakers } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {}

export default async function page({ params, searchParams }) {
  const paramsOrder = await searchParams;
  const filter = paramsOrder?.order ?? "all";
  const sneakers = await getSneakers(params.category);

  return (
    <div className="flex flex-col justify-center mx-auto gap-6 place-items-center">
      <div className="flex items-end justify-end w-3/4 ">
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
