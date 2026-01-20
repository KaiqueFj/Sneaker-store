import Sneaker from "@/app/_components/SneakerCompoundComponent/Sneaker";
import SneakerDetails from "./sneakerDetails";

export default function SneakersList({ filter = "all", sneakers }) {
  if (!sneakers) return null;

  let displayedSneaker;

  if (filter === "all") displayedSneaker = sneakers;

  if (filter === "Price Low to High")
    displayedSneaker = [...sneakers].sort(
      (a, b) => Number(a.price) - Number(b.price),
    );

  if (filter === "Price High to Low")
    displayedSneaker = [...sneakers].sort(
      (a, b) => Number(b.price) - Number(a.price),
    );

  if (filter === "Sale")
    displayedSneaker = sneakers
      .filter((s) => s.sale)
      .sort(
        (a, b) =>
          Number(b.sale.discountPercentage) - Number(a.sale.discountPercentage),
      );

  return (
    <Sneaker>
      {displayedSneaker && displayedSneaker.length > 0 ? (
        displayedSneaker.map((sneaker) => (
          <SneakerDetails key={sneaker.id} sneaker={sneaker} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          No sneakers available.
        </div>
      )}
    </Sneaker>
  );
}
