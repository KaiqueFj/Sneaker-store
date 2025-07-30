import SneakersCard from "./sneakersCard/SneakersCard";

export default function Catalog() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full">
      <SneakersCard
        name="Air Jordan 11"
        image="/_assets/sneakers/airJordan11-concord.png"
      />
      <SneakersCard
        name="Air Jordan 11"
        image="/_assets/sneakers/airJordan11-concord.png"
      />
      <SneakersCard
        name="Air Jordan 11"
        image="/_assets/sneakers/airJordan11-concord.png"
      />
      <SneakersCard
        name="Air Jordan 11"
        image="/_assets/sneakers/airJordan11-concord.png"
      />
    </div>
  );
}
