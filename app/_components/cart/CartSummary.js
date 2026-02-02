import { useSneaker } from "@/context/SneakerContext";
import { formatCurrency } from "@/utils/helpers";

export default function CartSummary({ selectedShipping }) {
  const { state } = useSneaker();

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingPrice = selectedShipping?.price ?? 0;
  const total = subtotal + shippingPrice;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Summary</h2>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex justify-between mt-2">
        <span>Shipping</span>
        <span>
          {selectedShipping
            ? selectedShipping.price === 0
              ? "Free"
              : formatCurrency(selectedShipping.price)
            : "—"}
        </span>
      </div>

      <div className="flex justify-between mt-4 border-t pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-bold">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
