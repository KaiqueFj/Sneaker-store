"use client";

import SneakerDesktopView from "@/app/_components/products/Details/SneakerDesktopView";
import SneakerMobileView from "@/app/_components/products/Details/SneakerMobileView";
import SneakerReviews from "@/app/_components/products/Details/SneakerReviews";
import { useSneakerPageController } from "@/hooks/useSneakerPageController";
import { ProductDetails } from "@/types/product";
import { ReviewWithRelations } from "@/types/review";

export default function SneakerSelectedInformation({
  sneaker,
  reviews,
}: {
  sneaker: ProductDetails;
  reviews: ReviewWithRelations[];
}) {
  const controller = useSneakerPageController(sneaker);

  return (
    <section className="w-full max-w-360 mx-auto lg:px-4 py-10">
      {/* MOBILE */}
      <SneakerMobileView {...controller} />

      {/* DESKTOP */}
      <SneakerDesktopView {...controller}>
        <div ref={controller.meta.reviewsDesktopRef}>
          <SneakerReviews
            reviews={reviews}
            setIsReviewOpen={controller.actions.setIsReviewOpen}
            isReviewOpen={controller.ui.isReviewOpen}
          />
        </div>
      </SneakerDesktopView>

      {/* MOBILE REVIEWS */}
      <div
        ref={controller.meta.reviewsMobileRef}
        className="lg:hidden px-4 mt-16"
      >
        <SneakerReviews
          reviews={reviews}
          setIsReviewOpen={controller.actions.setIsReviewOpen}
          isReviewOpen={controller.ui.isReviewOpen}
        />
      </div>
    </section>
  );
}
