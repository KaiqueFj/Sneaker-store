import Order from '@/app/_components/order/Order';

import { getOrdersAction } from '@/actions/order-action';
import { getUserReviewsAction } from '@/actions/reviews-action';

export default async function page() {
  const orders = await getOrdersAction();
  const reviews = await getUserReviewsAction();

  return (
    <div className=" mx-auto flex flex-col p-4 gap-6 max-w-7xl ">
      <div>
        <h2 className="mb-4 text-2xl text-center font-medium  text-accent-400">Seus pedidos</h2>
      </div>
      <Order orders={orders} reviews={reviews} />
    </div>
  );
}
