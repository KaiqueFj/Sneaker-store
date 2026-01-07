import { getSneaker, getSneakersReviews } from "../../../lib/data-service";
import SneakerSelectedInformation from "../../_components/Sneakers/sneakerSelectedInformation";

export default async function Page({ params }) {
  const { slug } = await params;

  const id = slug.split("-")[0];

  const sneakerDetails = await getSneaker(id);
  const reviews = await getSneakersReviews(id);

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
