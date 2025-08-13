import SneakerInfo from "../../_components/Sneakers/SneakersList/sneakerInfo";
import { getSneaker } from "../../_lib/data-service";

export default async function page({ params }) {
  const sneaker = await getSneaker(params.sneakerID);
  console.log(params);

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
