"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get("order") || "Todos";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    params.set("order", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-primary-600 font-medium rounded-md px-4 py-2 transition cursor-pointer"
      >
        <span className="lg:text-lg">
          <span className="text-primary-600 font-semibold">Ordenar por:</span>
          <span className="ml-1 text-primary-600/50">{activeFilter}</span>
        </span>
        <span className="relative ml-2 w-5 h-5">
          <ChevronDownIcon
            className={`absolute inset-0 w-5 h-5 transition-all duration-200 ease-in-out ${
              isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
          />
          <ChevronUpIcon
            className={`absolute inset-0 w-5 h-5 transition-all duration-200 ease-in-out ${
              isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
          />
        </span>
      </span>
      {isOpen && (
        <div className="flex flex-col gap-2  ml-[20%] p-2 absolute rounded-md  right-auto mt-2 w-48 z-50 bg-white shadow-lg">
          <FilterOptions
            filter="Todos"
            handleFilter={handleFilter}
            activeFilter={activeFilter}
          >
            Todos
          </FilterOptions>
          <FilterOptions
            filter="Menor preço"
            handleFilter={handleFilter}
            activeFilter={activeFilter}
          >
            Menor preço
          </FilterOptions>
          <FilterOptions
            filter="Maior preço"
            handleFilter={handleFilter}
            activeFilter={activeFilter}
          >
            Maior preço
          </FilterOptions>
          <FilterOptions
            filter="Oferta"
            handleFilter={handleFilter}
            activeFilter={activeFilter}
          >
            Oferta
          </FilterOptions>
        </div>
      )}
    </div>
  );
}

function FilterOptions({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 rounded-md hover:bg-primary-600/10 w-full text-primary-600 text-left ${
        filter === activeFilter ? "bg-primary-600/10 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
