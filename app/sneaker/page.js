import Image from "next/image";
import SneakersCard from "../_components/Main/Catalog/sneakerCard/SneakersCard";
import SneakerInfo from "../_components/Sneakers/SneakersList/sneakerInfo";

export default function page() {
  return (
    <div className="flex justify-center gap-4">
      <SneakerInfo
        name="Tênis Air Jordan 11"
        price="R$ 1199,00"
        category="Basketball"
        image="/_assets/sneakers/airJordan11-concord.png"
      />
    </div>
  );
}
