import React from "react";
import Order from "@/app/_components/orders/Order";
import { getOrders } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";

export default async function page() {
  const session = await auth();
  const orders = await getOrders(session?.user?.userId);

  return (
    <div className=" mx-auto flex flex-col p-4 gap-6 max-w-7xl ">
      <div>
        <h2 className="mb-4 text-2xl text-center font-medium  text-accent-400">
          Your Orders
        </h2>
      </div>
      <Order orders={orders} />
    </div>
  );
}
