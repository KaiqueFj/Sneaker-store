"use client";

import SearchResultItem from "@/app/_components/Sneakers/SearchResultItem/SearchResultItem";
import { getSneakerSearch } from "@/lib/data-service";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm">
      {/* Click outside */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}

      <AnimatePresence>
        <motion.div
          id="reviews-section"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className=" relative w-full max-w-4xl max-h-[85vh] mt-24 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col"
        >
          {/* Search header */}
          <div
            className=" relative flex items-center border-b border-gray-200 pb-4
          "
          >
            {/* Search icon */}
            <MagnifyingGlassIcon className="absolute left-0 w-5 h-5 text-gray-400" />

            {/* Input */}
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search sneakers"
              className=" w-full pl-8 pr-12 text-lg sm:text-xl bg-transparent outline-none placeholder:text-gray-400"
            />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close search"
              className=" absolute right-0 p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Results */}
          <div className="mt-6 flex-1 overflow-y-auto pr-2">
            {results.length > 0 ? (
              <div className="flex flex-col gap-2">
                {results.map((sneaker) => (
                  <SearchResultItem
                    onClose={onClose}
                    key={sneaker.id}
                    sneaker={sneaker}
                  />
                ))}
              </div>
            ) : (
              term.length >= 2 && (
                <p className="mt-8 text-center text-sm text-gray-500">
                  No sneakers found
                </p>
              )
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
