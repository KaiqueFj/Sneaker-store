"use client";

import SearchModal from "@/app/_components/ui/SearchModal/SearchModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SearchBar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Buscar"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-primary-600" />
      </button>

      {/* Modal */}
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
