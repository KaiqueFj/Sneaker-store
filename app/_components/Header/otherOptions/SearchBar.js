"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SearchModal from "../../SearchModal/SearchModal";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="relative w-full flex items-center cursor-text"
      >
        <MagnifyingGlassIcon className="absolute w-5 h-5 ml-2 text-primary-600" />
        <input
          readOnly
          placeholder="Search sneakers"
          className="w-full py-2 pl-8 rounded-4xl border border-primary-300"
        />
      </div>

      {/* Modal */}
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
