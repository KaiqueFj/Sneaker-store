import SneakersCard from "./sneakerCard/SneakersCard";

export default function Catalog() {
  return (
    <>
      <div className="flex flex-col items-center w-full gap-6 p-4 my-10">
        <p className="text-3xl text-primary-500 font-bold text-center">
          <span className="block">
            A collection of sneakers that can make you feel like a champion
          </span>
          <span className="block">And</span>
          <span className="block">achieve a dream</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-3/4">
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
    </>
  );
}
