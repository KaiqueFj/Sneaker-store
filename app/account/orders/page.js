import React from "react";
import Order from "@/app/_components/orders/Order";
import { getOrders } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";

export default async function page() {
  const session = await auth();
  const orders = await getOrders(session?.user?.userId);

  return (
    <div className="flex mx-auto flex-col max-w-7xl ">
      <Order orders={orders} />
    </div>
  );
}
