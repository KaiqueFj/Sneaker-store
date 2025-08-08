"use client";

import React from "react";
import SneakersList from "../_components/Sneakers/SneakersList/sneakerList";
import Filter from "../_components/Sneakers/filter/filter";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-end justify-end p-4 w-3/5">
        <Filter
          label="All Products"
          options={[
            "All products",
            "Price: High-low",
            "Price: Low-High",
            "Newest",
          ]}
          onSelect={(value) => console.log("Filter:", value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-3/5 self-center p-2 gap-4">
        <SneakersList
          name="Tênis Air Jordan 11"
          image="/_assets/sneakers/airJordan11-concord.png"
          price="R$ 1199,00"
          category="Basketball"
          link="/sneaker"
        />
        <SneakersList
          name="Tênis Air Jordan 11"
          image="/_assets/sneakers/airJordan11-concord.png"
          price="R$ 1199,00"
          category="Basketball"
          link="/sneakersList/airJordan11"
        />
        <SneakersList
          name="Tênis Air Jordan 11"
          image="/_assets/sneakers/airJordan11-concord.png"
          price="R$ 1199,00"
          category="Basketball"
          link="/sneakersList/airJordan11"
        />

        <SneakersList
          name="Tênis Air Jordan 11"
          image="/_assets/sneakers/airJordan11-concord.png"
          price="R$ 1199,00"
          category="Basketball"
          link="/sneakersList/airJordan11"
        />
      </div>
    </div>
  );
}
