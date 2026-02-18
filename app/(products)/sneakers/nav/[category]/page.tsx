import Category from "@/app/_components/layout/HeaderPages/Category";
import Filter from "@/app/_components/products/Filter/filter";
import SneakersList from "@/app/_components/products/List/sneakerList";
import { getSneakers } from "@/services/sneakers-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const pageCategory = await decodeURIComponent(category);

  return { title: `${pageCategory} Sneakers` };
}

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams?.order ?? "Todos";

  // decode category from URL
  const rawCategory = resolvedParams?.category || null;
  const category = rawCategory ? decodeURIComponent(rawCategory) : null;

  let sneakers = [];

  if (category) {
    const filterKey = ["masculino", "feminino"].includes(category.toLowerCase())
      ? "gender"
      : "model";

    sneakers = await getSneakers(filterKey, category);
  } else {
    sneakers = await getSneakers("Todos", "Todos");
  }

  return (
    <div className="flex  justify-center h-auto min-h-screen">
      <div className="w-full flex flex-col gap-10 max-w-360 mx-auto px-2 lg:px-10 box-border py-0 ">
        {/* Header */}
        <div className="flex items-center h- justify-between px-6 lg:px-12">
          <Category>{category ? `Tênis ${category}` : "Todos tênis"}</Category>
          <Filter />
        </div>

        <div className="flex justify-center lg:px-6 ">
          <SneakersList filter={filter} sneakers={sneakers} />
        </div>
      </div>
    </div>
  );
}
