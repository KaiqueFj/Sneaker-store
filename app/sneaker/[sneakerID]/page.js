import SneakerSelectedInformation from "../../_components/Sneakers/sneakerSelectedInformation";
import { getSneaker } from "../../_lib/data-service";

export default async function page({ params }) {
  const { sneakerID } = await params;
  const sneakerDetails = await getSneaker(sneakerID);

  return (
    <div className="flex justify-center gap-4">
      <SneakerSelectedInformation
        key={sneakerDetails.id}
        sneaker={sneakerDetails}
      />
    </div>
  );
}
