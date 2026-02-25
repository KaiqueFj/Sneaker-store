"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useState } from "react";

const SearchModal = dynamic(
  () => import("@/app/_components/ui/SearchModal/SearchModal"),
  { ssr: false },
);

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
