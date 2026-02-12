import { useCheckout } from "@/context/checkoutContext";
import { Shipping } from "@/types/shipping";
import { formatCurrency } from "@/utils/helpers";

export default function ShippingOptions({
  shipping,
}: {
  shipping: Shipping[];
}) {
  const { state, dispatch } = useCheckout();

  function handleSelect(option: Shipping) {
    dispatch({ type: "SET_SHIPPING", payload: option });
  }

  return (
    <div className="flex flex-col gap-3 rounded-md bg-gray-100 p-4">
      {shipping.map((option) => {
        const isSelected = state.shipping?.type === option.type;

        return (
          <label key={option.type} className="flex gap-3 cursor-pointer">
            <input
              type="radio"
              checked={isSelected}
              onChange={() => handleSelect(option)}
            />

            <div>
              <p className="font-semibold">
                {option.type} —{" "}
                {option.price === 0 ? "Free" : formatCurrency(option.price)}
              </p>
              <p className="text-sm text-gray-600">
                {option.days} business days
              </p>
            </div>
          </label>
        );
      })}

      {state.address?.city && (
        <p className="mt-2 text-sm text-gray-500">
          Deliver to{" "}
          <span className="font-medium">
            {state.address.city}, {state.address.state}
          </span>
        </p>
      )}
    </div>
  );
}
