"use client";

import { useSneaker } from "@/context/SneakerContext";
import { getPreviewText } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useFavoriteSneaker } from "./useFavoriteSneaker";

type Sneaker = {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  gender: string;
  model: string;
  isFavorite: boolean;
  rating_avg: number;
  rating_count: number;
  description: string;
};

export function useSneakerPageController(sneaker: Sneaker) {
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

  const [mainImage, setMainImage] = useState<string>(images[0] ?? "");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [sneakerSize, setSneakerSize] = useState<string>(sizes[0] ?? "");
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

  const reviewsDesktopRef = useRef<HTMLDivElement | null>(null);
  const reviewsMobileRef = useRef<HTMLDivElement | null>(null);

  const { dispatch } = useSneaker();
  const pathname = usePathname();
  const { intro, benefits } = getPreviewText(description);

  const { isFavoriteState, isPending, handleFavorite } = useFavoriteSneaker(
    isFavorite,
    id,
  );

  const currentUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";

  const goToReviews = () => {
    const target =
      window.innerWidth >= 1024
        ? reviewsDesktopRef.current
        : reviewsMobileRef.current;

    target?.scrollIntoView({ behavior: "smooth" });
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

  return {
    product: {
      id,
      name,
      price,
      category,
      images,
      sizes,
      colors,
      gender,
      model,
      rating_avg,
      rating_count,
      description,
      intro,
      benefits,
    },

    ui: {
      mainImage,
      isDescriptionOpen,
      sneakerSize,
      isReviewOpen,
    },

    actions: {
      setMainImage,
      setIsDescriptionOpen,
      setSneakerSize,
      setIsReviewOpen,
      addToCart,
      handleFavorite,
      goToReviews,
    },

    meta: {
      toast,
      currentUrl,
      isFavoriteState,
      isPending,
      reviewsDesktopRef,
      reviewsMobileRef,
    },
  };
}
