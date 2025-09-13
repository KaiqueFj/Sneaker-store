import { getOrderItems } from "@/app/_lib/data-service";
import Image from "next/image";
import Link from "next/link";

export default async function page({ params }) {
  const { order_id } = await params;
  const order = await getOrderItems(order_id);

  return (
    <div className="flex flex-col md:flex-col gap-8 p-4 md:p-6 max-w-7xl mx-auto w-full">
      {/* Bag details */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Order <span className="text-primary-500">{order_id}</span>
        </h1>
        <p className="text-slate-500 mt-1">Order details and purchased items</p>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 w-full">
        {order.length === 0 ? (
          <p className="text-primary-500">There are no items in your order.</p>
        ) : (
          order.map((sneaker) => (
            <div
              key={`${sneaker.id}-${sneaker.size}`}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 border rounded-2xl p-4 shadow-sm bg-white"
            >
              {/* Sneaker image */}
              <Link href={`/sneaker/${sneaker.id}`}>
                <Image
                  src={sneaker.image[0]}
                  alt={sneaker.name}
                  width={140}
                  height={120}
                  className="rounded-xl object-cover w-full md:w-[140px] h-auto"
                />
              </Link>

              {/* Sneaker info */}
              <div className="flex flex-col flex-1">
                <span className="text-lg md:text-base font-semibold text-primary-500">
                  {sneaker.name}
                </span>
                <span className="text-sm font-medium text-primary-500/50">
                  {sneaker.category}
                </span>
                <span className="text-base font-semibold text-primary-500 mt-1">
                  ${sneaker.price}
                </span>
                <span className="text-sm font-medium text-primary-500/50">
                  Size {sneaker.size}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
