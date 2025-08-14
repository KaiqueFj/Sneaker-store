import SneakerSelectedInformation from "../../_components/Sneakers/sneakerSelectedInformation";
import { getSneaker } from "../../_lib/data-service";

export default async function page({ params }) {
  const sneaker = await getSneaker(params.sneakerID);

  return (
    <div className="flex justify-center gap-4">
      <SneakerSelectedInformation key={sneaker.id} sneaker={sneaker} />
    </div>
  );
}
