import Banner from "@/app/_components/layout/Main/Banner";
import Catalog from "@/app/_components/layout/Main/Catalog";

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
