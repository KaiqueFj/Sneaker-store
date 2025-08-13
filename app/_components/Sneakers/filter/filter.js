"use client";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Filter({ label = "Filter" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const appliedFilters = ["Calçados", "Fashion"];

  const sections = [
    {
      title: "Classificar por",
      options: ["Mais recente", "Menor preço", "Maior preço"],
    },
    { title: "Gênero", options: ["Masculino", "Feminino", "Unissex"] },
    { title: "Cor", options: ["Preto", "Branco", "Azul", "Vermelho"] },
    { title: "Tipo", options: ["Tênis", "Sandália", "Bota"] },
    { title: "Descontos", options: ["10%", "20%", "50%"] },
    { title: "Tipo de produto", options: ["Roupas", "Calçados", "Acessórios"] },
    {
      title: "Preço",
      options: ["Até R$ 100", "R$ 100 - R$ 300", "Mais de R$ 300"],
    },
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-primary-500 hover:bg-primary-700/70 font-medium rounded-md px-4 py-2 transition"
      >
        <span className="text-primary-500 font-medium">{label}</span>
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
      </button>

      {/* Overlay + Side Panel */}
      {isOpen && (
        <>
          {/* Dark Background */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          ></div>

          {/* Right Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[32%] bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 ease-in-out">
            {/* Panel Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-2xl font-bold text-primary-500">{label}</h2>
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* Applied Filters */}
            <div className="mt-4">
              <p className="text-xl font-bold text-gray-700 mb-2">
                Filtros aplicados
              </p>
              <div className="flex flex-wrap gap-2">
                {appliedFilters.map((filter, idx) => (
                  <span
                    key={idx}
                    className="flex items-center text-primary-500 font-medium gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {filter}
                    <button className="text-primary-500  hover:text-black">
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="mt-6 divide-y">
              {sections.map((section, idx) => (
                <div key={idx} className="py-2">
                  <button
                    className="flex justify-between items-center text-lg font-semibold text-primary-500 w-full  text-left"
                    onClick={() => toggleSection(section.title)}
                  >
                    {section.title}
                    <ChevronDownIcon
                      className={`w-5 h-5 transform transition-transform ${
                        openSection === section.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSection === section.title && (
                    <div className="mt-2 pl-2 space-y-1">
                      {section.options.map((opt, i) => (
                        <label
                          key={i}
                          className="flex items-center font-medium text-primary-500 gap-2 text-sm"
                        >
                          <input type="checkbox" />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
