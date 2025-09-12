import React from "react";
import Order from "../_components/order/Order";
import { getOrders } from "../_lib/data-service";

export default async function page() {
  const orders = await getOrders("f7bb94fd-d7fb-42d2-a375-082dd42619ff");

  return (
    <div>
      {orders.map((order) => {
        return <Order key={order.id} order={order} />;
      })}
    </div>
  );
}
