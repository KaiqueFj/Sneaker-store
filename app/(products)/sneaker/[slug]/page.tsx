import SneakerSelectedInformation from "@/app/_components/products/Details/sneakerSelectedInformation";
import { getSneakersReviews } from "@/services/reviews-service";
import { getSneakerDetails } from "@/services/sneakers-service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const id = slug.split("-")[0];

  const sneakerDetails = await getSneakerDetails(id);

  if (!sneakerDetails) {
    return notFound();
  }

  const reviews = await getSneakersReviews(id);

  return (
    <div className="w-full justify-items-center">
      <SneakerSelectedInformation sneaker={sneakerDetails} reviews={reviews} />
    </div>
  );
}
