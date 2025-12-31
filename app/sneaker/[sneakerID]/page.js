import { getSneaker, getSneakersReviews } from "../../../lib/data-service";
import SneakerSelectedInformation from "../../_components/Sneakers/sneakerSelectedInformation";

export default async function page({ params }) {
  const { sneakerID } = await params;
  const sneakerDetails = await getSneaker(sneakerID);
  const reviews = await getSneakersReviews(sneakerID);

  return (
    <div className="flex w-full gap-4">
      <SneakerSelectedInformation
        key={sneakerDetails.id}
        sneaker={sneakerDetails}
        reviews={reviews}
      />
    </div>
  );
}
