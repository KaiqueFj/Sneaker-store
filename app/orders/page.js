import React from "react";
import Order from "../_components/orders/Order";
import { getOrders } from "../_lib/data-service";

export default async function page() {
  const orders = await getOrders("f7bb94fd-d7fb-42d2-a375-082dd42619ff");

  return (
    <div className=" mx-auto bg-amber-400 flex flex-col max-w-7xl ">
      <Order orders={orders} />;
    </div>
  );
}
