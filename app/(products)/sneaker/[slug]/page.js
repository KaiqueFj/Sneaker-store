import SneakerSelectedInformation from "@/app/_components/products/Details/sneakerSelectedInformation";
import { getSneaker } from "@/services/sneakers-service";
import { getSneakersReviews } from "@/services/reviews-service";

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
