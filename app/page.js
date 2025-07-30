import Image from "next/image";
import Catalog from "./_components/Main/Catalog/Catalog";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-primary-500 font-bold">
        Take a dive into the Shark Store!
      </h1>

      <div>
        <Catalog />
      </div>
    </div>
  );
}
