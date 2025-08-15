import React, { Suspense } from "react";
import SneakersList from "../_components/Sneakers/sneakerList";
import Filter from "../_components/Sneakers/filter/filter";
import Spinner from "../_components/Spinner/Spinner";

export default async function page({ searchParams }) {
  const filter = searchParams?.order ?? "all";

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-end justify-end p-4 w-4/5">
        <Filter />
      </div>
      <div className="flex flex-row w-5/5 justify-center">
        <Suspense fallback={<Spinner />} key={filter}>
          <SneakersList filter={filter} />
        </Suspense>
      </div>
    </div>
  );
}
