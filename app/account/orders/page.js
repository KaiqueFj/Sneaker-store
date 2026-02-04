import { auth } from "../../../lib/auth";
import { getOrders, getUserReviews } from "../../../lib/data-service";
import Order from "../../_components/layout/orders/Order";

export default async function page() {
  const session = await auth();
  const orders = await getOrders(session?.user?.userId);

  const reviews = await getUserReviews(session?.user?.userId);

  return (
    <div className=" mx-auto flex flex-col p-4 gap-6 max-w-7xl ">
      <div>
        <h2 className="mb-4 text-2xl text-center font-medium  text-accent-400">
          Your Orders
        </h2>
      </div>
      <Order orders={orders} reviews={reviews} />
    </div>
  );
}
