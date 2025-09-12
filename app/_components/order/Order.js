import Image from "next/image";
import Link from "next/link";

export default async function Order({ order }) {
  const { order_items } = order;

  console.log(order_items);
  return (
    <>
      <div className="flex flex-col">
        <h2>Order ID: {order.id}</h2>

        {order_items.map((items) => {
          return (
            <div
              key={items.id}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 border rounded-2xl p-4 shadow-sm bg-white"
            >
              <h3>{items.name}</h3>
              {/* Sneaker image */}
              <Link href={`/sneaker/${items.id}`}>
                <Image
                  src={items.image}
                  alt={items.name}
                  width={140}
                  height={120}
                  className="rounded-xl object-cover w-full md:w-[140px] h-auto"
                />
              </Link>

              {/* Sneaker info */}
              <div className="flex flex-col flex-1">
                <span className="text-lg md:text-base font-semibold text-primary-500">
                  {items.name}
                </span>
                <span className="text-sm font-medium text-primary-500/50">
                  {items.category}
                </span>
                <span className="text-base font-semibold text-primary-500 mt-1">
                  ${items.price}
                </span>
                <span className="text-sm font-medium text-primary-500/50">
                  Size {items.size}
                </span>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
    </>
  );
}
