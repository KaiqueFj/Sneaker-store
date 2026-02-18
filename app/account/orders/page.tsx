import Order from "@/app/_components/order/Order";
import { getOrders } from "@/services/orders-service";
import { getUserReviews } from "@/services/reviews-service";
import { auth } from "../../../lib/auth";

export default async function page() {
  const session = await auth();
  const orders = await getOrders(session?.user?.userId);
  const reviews = await getUserReviews(session?.user?.userId);

  return (
    <div className=" mx-auto flex flex-col p-4 gap-6 max-w-7xl ">
      <div>
        <h2 className="mb-4 text-2xl text-center font-medium  text-accent-400">
          Seus pedidos
        </h2>
      </div>
      <Order orders={orders} reviews={reviews} />
    </div>
  );
}
