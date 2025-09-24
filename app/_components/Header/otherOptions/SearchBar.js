import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="relative p-0.5 pl-6 rounded-4xl text-primary-600 border border-primary-300 w-50 focus:outline-none focus:border-primary-500"
      />
      <MagnifyingGlassIcon className="absolute text-primary-600 w-4.5 h-4.5 ml-1.5 " />
    </div>
  );
}
