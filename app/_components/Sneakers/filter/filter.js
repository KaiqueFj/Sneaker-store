"use client";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

export default function Filter({ label = "Filter", options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleOptionClick(option) {
    onSelect(option);
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-primary-500 hover:bg-primary-700/70 font-medium rounded-md px-4 py-2 transition"
      >
        <span>{label}</span>
        <span className="relative ml-2 w-5 h-5">
          {/* Down icon */}
          <ChevronDownIcon
            className={`absolute inset-0 w-5 h-5 transition-all duration-200 ease-in-out ${
              isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
          />

          {/* Up icon */}
          <ChevronUpIcon
            className={`absolute inset-0 w-5 h-5 transition-all duration-200 ease-in-out ${
              isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 z-10 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
