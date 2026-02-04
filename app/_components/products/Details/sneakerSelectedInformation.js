"use client";

import SneakerDesktopView from "./sneakerPageStructure/SneakerDesktopView";
import SneakerMobileView from "./sneakerPageStructure/SneakerMobileView";
import SneakerReviews from "./sneakerPageStructure/SneakerReviews";
import { useSneakerPageController } from "./useSneakerPageController";

export default function SneakerSelectedInformation({ sneaker, reviews }) {
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
