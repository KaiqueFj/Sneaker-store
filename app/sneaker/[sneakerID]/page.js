import { getSneaker, getSneakersReviews } from "../../../lib/data-service";
import SneakerSelectedInformation from "../../_components/Sneakers/sneakerSelectedInformation";

export default async function page({ params }) {
  const { sneakerID } = await params;
  const sneakerDetails = await getSneaker(sneakerID);
  const reviews = await getSneakersReviews(sneakerID);

  return (
    <div className="w-full justify-items-center">
      <SneakerSelectedInformation
        key={sneakerDetails.id}
        sneaker={sneakerDetails}
        reviews={reviews}
      />
    </div>
  );
}
