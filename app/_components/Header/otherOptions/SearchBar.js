import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="relative py-2 pl-8 rounded-4xl text-primary-600 border border-primary-300 w-full  focus:outline-none focus:border-primary-500"
      />
      <MagnifyingGlassIcon className="absolute text-primary-600 font-bold w-4.5 h-4.5 ml-2 " />
    </div>
  );
}
