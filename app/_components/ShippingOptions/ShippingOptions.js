import { formatCurrency } from "@/utils/helpers";

export default function ShippingOptions({ shipping, onSelect }) {
  return (
    <div className="flex flex-col rounded-md bg-gray-100 gap-3 p-4">
      {shipping.options.map((option) => (
        <label
          key={option.type}
          className="flex items-start gap-3 cursor-pointer"
        >
          <input
            type="radio"
            name="shipping"
            onChange={() => onSelect(option)}
          />

          <div>
            <p className="font-semibold">
              {option.type} —{" "}
              {option.price === 0 ? "Free" : formatCurrency(option.price)}
            </p>
            <p className="text-sm text-gray-600">{option.days} business days</p>
          </div>
        </label>
      ))}

      <p className="text-sm text-gray-500 mt-2">
        Deliver to {shipping.location.city}, {shipping.location.state}
      </p>
    </div>
  );
}
