"use client";

import SneakerDesktopView from "@/app/_components/Sneakers/sneakerPageStructure/SneakerDesktopView";
import SneakerMobileView from "@/app/_components/Sneakers/sneakerPageStructure/SneakerMobileView";
import SneakerReviews from "@/app/_components/Sneakers/sneakerPageStructure/SneakerReviews";
import { getPreviewText } from "@/utils/helpers";
import { useRef, useState } from "react";
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
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [sneakerSize, setSneakerSize] = useState(sizes[0]);
  const { dispatch } = useSneaker();
  const { intro, benefits } = getPreviewText(description);
  const reviewsDesktopRef = useRef(null);
  const reviewsMobileRef = useRef(null);
  const { isFavoriteState, isPending, handleFavorite } = useFavoriteSneaker(
    isFavorite,
    id
  );

  const goToReviews = () => {
    const target =
      window.innerWidth >= 1024
        ? reviewsDesktopRef.current
        : reviewsMobileRef.current;

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    intro,
    benefits,
    rating_avg,
    rating_count,
    images,
  };

  const sharedActions = {
    mainImage,
    setMainImage,
    isFavoriteState,
    setIsDescriptionOpen,
    isDescriptionOpen,
    getPreviewText,
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
        <div ref={reviewsDesktopRef}>
          <SneakerReviews reviews={reviews} />
        </div>
      </SneakerDesktopView>

      <div ref={reviewsMobileRef} className="lg:hidden px-4 mt-16">
        <SneakerReviews reviews={reviews} />
      </div>
    </section>
  );
}
