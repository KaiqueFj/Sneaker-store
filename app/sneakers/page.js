"use client";

import React from "react";
import SneakersList from "../_components/Sneakers/SneakersList/sneakerList";
import Filter from "../_components/Sneakers/filter/filter";
import { getSneakers } from "../_lib/data-service";

export default async function page() {
  const sneakers = await getSneakers();

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-end justify-end p-4 w-3/5">
        <Filter
          label="Filter"
          onSelect={(value) => console.log("Filter:", value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-3/5 self-center p-2 gap-4">
        {sneakers.map((sneaker) => (
          <SneakersList
            key={sneaker.id}
            name={sneaker.name}
            image={sneaker.images[0]}
            price={sneaker.price}
            category={sneaker.category}
            link={`/sneaker/${sneaker.id}`}
          />
        ))}
      </div>
    </div>
  );
}
