import Catalog from "./_components/Main/Catalog";
import Banner from "./_components/Main/Banner";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col  items-center justify-center mt-8">
        <Banner />
        <Catalog />
      </div>
    </div>
  );
}
