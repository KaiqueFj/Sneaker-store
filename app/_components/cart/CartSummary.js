import { useSneaker } from "@/context/SneakerContext";
import { formatCurrency } from "@/utils/helpers";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

export default function CartSummary({ selectedShipping }) {
  const { state } = useSneaker();

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingPrice = selectedShipping?.price ?? 0;
  const total = subtotal + shippingPrice;

  return (
    <div className="bg-white border border-primary-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-primary-600 mb-5">
        Order Summary
      </h2>

      <div className="flex flex-col gap-3 mb-5">
        {/* Promo */}
        <button className="flex justify-between items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group">
          <span className="text-sm font-medium text-primary-600">
            Have a promo code?
          </span>
          <ArrowDownIcon className="h-4 w-4 text-primary-400 group-hover:text-primary-600 transition-colors" />
        </button>
      </div>

      <div className="flex flex-col gap-3 py-4 border-t border-b border-primary-200">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-sm text-primary-400">Subtotal</span>
          <span className="font-medium text-primary-600">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-sm text-primary-400">Shipping</span>
          <span className="font-medium text-primary-600">
            {selectedShipping
              ? selectedShipping.price === 0
                ? "Free"
                : formatCurrency(selectedShipping.price)
              : "—"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-1">
        <span className="text-base font-semibold text-primary-600">Total</span>
        <span className="text-2xl font-bold text-primary-600">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}
