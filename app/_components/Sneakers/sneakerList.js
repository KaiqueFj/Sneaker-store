import React from "react";
import SneakerDetails from "./sneakerDetails";
import { getSneakers } from "@/app/_lib/data-service";

export default async function SneakersList({ filter }) {
  const sneakers = await getSneakers();

  if (!sneakers) return null;

  let displayedSneaker;

  if (filter === "all") displayedSneaker = sneakers;

  if (filter === "Price Low to High")
    displayedSneaker = sneakers.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );

  if (filter === "Price High to Low")
    displayedSneaker = sneakers.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-fit gap-2 ">
      {displayedSneaker.map((sneaker) => (
        <SneakerDetails key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}
