import Link from "next/link";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
export default function OtherOptions() {
  return (
    <div className="flex items-center gap-2 text-md">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="relative p-0.5 pl-6 rounded-4xl text-primary-500 border border-primary-300 w-50 focus:outline-none focus:border-primary-500"
        />
        <MagnifyingGlassIcon className="absolute text-primary-500 w-4.5 h-4.5 ml-1.5 " />
      </div>

      <button className="transition-colors rounded-xl p-2 hover:bg-gray-300">
        <ShoppingBagIcon className="text-primary-500 w-6 h-6 " />
      </button>

      <button className="transition-colors rounded-xl p-2 hover:bg-gray-300">
        <HeartIcon className="text-primary-500 w-6 h-6 " />
      </button>

      <button className="transition-colors rounded-xl p-2 hover:bg-gray-300">
        <UserCircleIcon className="text-primary-500 w-6 h-6 " />
      </button>
    </div>
  );
}
