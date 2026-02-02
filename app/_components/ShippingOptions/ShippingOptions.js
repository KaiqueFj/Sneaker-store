import { formatCurrency } from "@/utils/helpers";

export default function ShippingOptions({ shipping }) {
  return (
    <div className="flex flex-col rounded-md bg-gray-100 gap-2 w-full p-4">
      {shipping.options.map((option) => (
        <div key={option.type} className="flex items-center text-left gap-2">
          <p className="text-lg font-semibold">{option.type}:</p>
          <p className="text-bases font-medium">
            {option.days} business days (
            {option.price === 0 ? "Free" : formatCurrency(option.price)})
          </p>
        </div>
      ))}
      <p>
        Deliver to {shipping.location.city}, {shipping.location.state}
      </p>
    </div>
  );
}
