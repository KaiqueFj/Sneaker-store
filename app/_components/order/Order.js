import Link from "next/link";
import { formatDate } from "../../utils/helpers";

export default async function Order({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500">No orders found.</div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-green-100 text-green-700"; // shipped or completed
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border border-slate-200 text-sm text-left">
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-slate-200">Order ID</th>
              <th className="px-4 py-3 border-b border-slate-200">Date</th>
              <th className="px-4 py-3 border-b border-slate-200">Total</th>
              <th className="px-4 py-3 border-b border-slate-200">Status</th>
              <th className="px-4 py-3 border-b border-slate-200">Items</th>
              <th className="px-4 py-3 border-b border-slate-200 text-center">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id} className="bg-white hover:bg-slate-50">
                <td className="px-4 py-6 font-medium text-slate-700">
                  {order.id}
                </td>
                <td className="px-4 py-6 text-slate-500">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-4 py-6 font-semibold text-slate-700">
                  {order.total_price}
                </td>
                <td className="px-4 py-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status || "Shipped"}
                  </span>
                </td>
                <td className="px-4 py-6 text-slate-600">
                  {order.order_items?.length || 0}
                </td>
                <td className="px-4 py-6 text-center">
                  <Link
                    href={`/orders/item/${order.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
