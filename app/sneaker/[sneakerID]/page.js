import SneakerInfo from "../../_components/Sneakers/sneakerInfo/sneakerInfo";
import { getSneaker } from "../../_lib/data-service";

export default async function page({ params }) {
  const sneaker = await getSneaker(params.sneakerID);

  return (
    <div className="flex justify-center gap-4">
      <SneakerInfo
        name={sneaker.name}
        price={sneaker.price}
        category={sneaker.category}
        image={sneaker.images[0]}
        sizes={sneaker.sizes}
      />
    </div>
  );
}
