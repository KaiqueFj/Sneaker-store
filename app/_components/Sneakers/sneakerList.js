import React from "react";
import SneakerDetails from "./sneakerDetails";
import { getSneakers } from "@/app/_lib/data-service";

export default async function SneakersList({ filter }) {
  const sneakers = await getSneakers();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 self-center p-2 gap-4">
      {sneakers.map((sneaker) => (
        <SneakerDetails key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}
