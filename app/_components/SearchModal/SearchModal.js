"use client";

import SearchResultItem from "@/app/_components/Sneakers/SearchResultItem/SearchResultItem";
import { getSneakerSearch } from "@/lib/data-service";
import { useEffect, useState } from "react";

export default function SearchModal({ onClose }) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (term.length < 2) {
      setResults([]);
      return;
    }

    const id = setTimeout(() => {
      getSneakerSearch(term).then(setResults);
    }, 400);

    return () => clearTimeout(id);
  }, [term]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div
        className="
        relative
        w-full
        bg-white
        rounded-b-3xl
        px-6 pt-6 pb-8
        max-h-[70vh]
        overflow-hidden
      "
      >
        {/* Search input */}
        <input
          autoFocus
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search sneakers"
          className="
            w-full
            border-b
            pb-3
            text-lg
            outline-none
          "
        />

        {/* Results */}
        <div
          className="
          mt-6
          overflow-y-auto
          max-h-[calc(70vh-100px)]
        "
        >
          {results.length > 0 && (
            <div
              className="
              grid gap-6
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
            "
            >
              {results.map((sneaker) => (
                <SearchResultItem key={sneaker.id} sneaker={sneaker} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
