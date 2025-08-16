import React, { Suspense } from "react";
import SneakersList from "../_components/Sneakers/sneakerList";
import Filter from "../_components/Sneakers/filter/filter";
import Spinner from "../_components/Spinner/Spinner";

export default async function page({ searchParams }) {
  const params = await searchParams;
  const filter = params?.order ?? "all";
  return (
    <div className="flex flex-col justify-center mx-auto gap-6 place-items-center">
      <div className="flex items-end justify-end w-3/4 ">
        <Filter />
      </div>
      <div className="flex flex-row justify-center w-3/4">
        <Suspense fallback={<Spinner />} key={filter}>
          <SneakersList filter={filter} />
        </Suspense>
      </div>
    </div>
  );
}
