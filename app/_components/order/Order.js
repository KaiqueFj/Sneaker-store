import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../utils/helpers";

export default async function Order({ order }) {
  const { order_items, id, created_at, total_price } = order;

  console.log(total_price);

  return (
    <>
      <div className="flex flex-col">
        <table className="table-auto border-collapse border text-primary-500 border-slate-400">
          <thead>
            <tr role="row">
              <th>Order identifier</th>
              <th>date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Items</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {order_items.map((items) => (
              <tr key={items.id}>
                <td>{items.id}</td>
                <td>{items.quantity}</td>
                <td>{formatDate(created_at)}</td>
                <td>{total_price}</td>
                <td>{items.quantity}</td>
                <td>
                  <button className=" underline space-y-2">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Order ID: {order.id}</h2>
      </div>
    </>
  );
}
