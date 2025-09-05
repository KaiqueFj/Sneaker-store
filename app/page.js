import Catalog from "./_components/Main/Catalog";
import Banner from "./_components/Main/Banner";

export default function Home() {
  return (
    <div className="w-screen py-6">
      <div className="flex flex-col max-w-screen  items-center justify-center mt-8">
        <Banner />
        <Catalog />
      </div>
    </div>
  );
}
