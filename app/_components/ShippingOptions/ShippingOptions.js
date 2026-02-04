import { useCheckout } from "@/context/checkoutContext";
import { formatCurrency } from "@/utils/helpers";

export default function ShippingOptions({ shipping }) {
  const { state, dispatch } = useCheckout();

  function handleSelect(option) {
    dispatch({ type: "SET_SHIPPING", payload: option });
  }

  return (
    <div className="flex flex-col gap-3 rounded-md bg-gray-100 p-4">
      {shipping.options.map((option) => {
        const isSelected = state.shipping?.type === option.type;

        return (
          <label
            key={option.type}
            className={`flex items-start gap-3 cursor-pointer rounded-md p-3 transition
              ${isSelected ? "bg-white ring-1 ring-black" : "hover:bg-white/60"}
            `}
          >
            <input
              type="radio"
              name="shipping"
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

      <p className="mt-2 text-sm text-gray-500">
        Deliver to {shipping.location.city}, {shipping.location.state}
      </p>
    </div>
  );
}
