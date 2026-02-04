import { useCheckout } from "@/context/checkoutContext";
import { useSneaker } from "@/context/SneakerContext";
import { formatCurrency } from "@/utils/helpers";

export default function CartSummary({ selectedShipping }) {
  const { state } = useSneaker();
  const { state: checkout } = useCheckout();

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountPercentage = checkout.cupom?.value ?? 0;

  const shippingPrice = selectedShipping?.price ?? 0;
  const total =
    subtotal + shippingPrice - (subtotal * discountPercentage) / 100;

  const discountValue =
    discountPercentage > 0 ? (subtotal * discountPercentage) / 100 : 0;

  return (
    <div className="bg-white border border-primary-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-primary-600 mb-5">
        Order Summary
      </h2>

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

        {/* Coupon */}
        {checkout.cupom && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Coupon applied
              <span className="ml-1 font-medium uppercase">
                ({checkout.cupom.code ?? `${discountPercentage}% OFF`})
              </span>
            </span>
            <span className="font-medium">
              -{formatCurrency(discountValue)}
            </span>
          </div>
        )}
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
