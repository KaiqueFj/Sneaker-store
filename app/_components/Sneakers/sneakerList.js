import React, { Suspense } from "react";
import SneakerDetails from "./sneakerDetails";
import Spinner from "../Spinner/Spinner";

export default async function SneakersList({ filter, sneakers }) {
  if (!sneakers) return null;

  let displayedSneaker;

  console.log(sneakers);

  if (filter === "all") displayedSneaker = sneakers;

  if (filter === "Price Low to High")
    displayedSneaker = [...sneakers].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );

  if (filter === "Price High to Low")
    displayedSneaker = [...sneakers].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      <Suspense fallback={<Spinner />} key={filter}>
        {displayedSneaker && displayedSneaker.length > 0 ? (
          displayedSneaker.map((sneaker) => (
            <SneakerDetails key={sneaker.id} sneaker={sneaker} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No sneakers available.
          </div>
        )}
      </Suspense>
    </div>
  );
}
