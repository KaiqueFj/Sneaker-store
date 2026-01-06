"use client";

import SneakerDesktopView from "@/app/_components/Sneakers/sneakerPageStructure/SneakerDesktopView";
import SneakerMobileView from "@/app/_components/Sneakers/sneakerPageStructure/SneakerMobileView";
import SneakerReviews from "@/app/_components/Sneakers/sneakerPageStructure/SneakerReviews";
import { useState } from "react";
import { useSneaker } from "../../../context/SneakerContext";
import { useFavoriteSneaker } from "../../hooks/useFavoriteSneaker";

export default function SneakerSelectedInformation({ sneaker, reviews }) {
  const {
    id,
    name,
    price,
    category,
    images,
    sizes,
    colors,
    gender,
    model,
    isFavorite,
    rating_avg,
    rating_count,
    description,
  } = sneaker;

  const [mainImage, setMainImage] = useState(images[0]);
  const [sneakerSize, setSneakerSize] = useState(sizes[0]);
  const { dispatch } = useSneaker();

  const { isFavoriteState, isPending, handleFavorite } = useFavoriteSneaker(
    isFavorite,
    id
  );

  const goToReviews = () => {
    document
      .getElementById("reviews")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name,
        price,
        category,
        colors,
        gender,
        model,
        size: sneakerSize,
        image: mainImage,
      },
    });
  };

  /* ---------- grouped props ---------- */
  const productProps = {
    name,
    category,
    price,
    sizes,
    description,
    rating_avg,
    rating_count,
    images,
  };

  const sharedActions = {
    mainImage,
    setMainImage,
    isFavoriteState,
    addToCart,
    sneakerSize,
    handleFavorite,
    goToReviews,
    setSneakerSize,
  };

  return (
    <section className="w-full max-w-360 mx-auto lg:px-4 py-10">
      {/* MOBILE */}
      <SneakerMobileView
        {...productProps}
        {...sharedActions}
        isPending={isPending}
      />

      {/* DESKTOP */}
      <SneakerDesktopView
        {...productProps}
        {...sharedActions}
        isPending={isPending}
      >
        <div id="reviews" className=" ">
          <SneakerReviews reviews={reviews} />
        </div>
      </SneakerDesktopView>

      <div id="reviews" className="lg:hidden px-4 ">
        <SneakerReviews reviews={reviews} />
      </div>
    </section>
  );
}
