import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <div className=" mx-auto flex flex-col items-center text-center ">
      <CheckCircleIcon className="w-20 h-20 text-green-500 mb-6" />

      <h1 className="text-4xl font-bold text-gray-900">
        Thank you for your order!
      </h1>

      <p className="text-lg text-gray-600 mt-3 max-w-md">
        Your purchase was successful. You can view the status and details of
        your order at any time.
      </p>

      <Link
        href="/account/orders"
        className="mt-8 inline-block bg-primary-600 hover:bg-primary-600/40 text-primary-50 text-lg font-medium py-3 px-6 rounded-xl transition-all shadow-sm"
      >
        Manage your orders →
      </Link>
    </div>
  );
}
