import SneakerDetails from "@/app/_components/products/Details/sneakerDetails";
import Sneaker from "@/app/_components/products/Sneaker";
import { ProductListItem } from "@/types/product";

export default function SneakersList({
  filter = "Todos",
  sneakers,
}: {
  filter: string;
  sneakers: ProductListItem[];
}) {
  if (!sneakers) return null;

  let displayedSneaker: ProductListItem[] = [];

  if (filter === "Todos") displayedSneaker = sneakers;

  if (filter === "Menor preço")
    displayedSneaker = [...sneakers].sort(
      (a, b) => Number(a.price) - Number(b.price),
    );

  if (filter === "Maior preço")
    displayedSneaker = [...sneakers].sort(
      (a, b) => Number(b.price) - Number(a.price),
    );

  if (filter === "Oferta")
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
          Nenhum tenis encontrado
        </div>
      )}
    </Sneaker>
  );
}
