import React, { Suspense } from "react";
import SneakersList from "../_components/Sneakers/sneakerList";
import Filter from "../_components/Sneakers/filter/filter";
import Spinner from "../_components/Spinner/Spinner";

export default async function page({ searchParams }) {
  const filter = searchParams?.order ?? "all";

  return (
    <div className="flex flex-col self-center px-10">
      <div className="flex items-end justify-end p-4 w-[87%]">
        <Filter />
      </div>
      <div className="flex flex-row justify-center">
        <Suspense fallback={<Spinner />} key={filter}>
          <SneakersList filter={filter} />
        </Suspense>
      </div>
    </div>
  );
}
