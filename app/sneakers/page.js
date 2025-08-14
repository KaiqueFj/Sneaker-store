import React from "react";
import SneakersList from "../_components/Sneakers/sneakerList";
import Filter from "../_components/Sneakers/filter/filter";
import { getSneakers } from "../_lib/data-service";

export default async function page({ searchParams }) {
  const sneakers = await getSneakers();
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-end justify-end p-4 w-3/5">
        <Filter />
      </div>
      <div className="flex flex-row w-5/5 justify-center">
        <SneakersList key={sneakers.id} sneakers={sneakers} />
      </div>
    </div>
  );
}
