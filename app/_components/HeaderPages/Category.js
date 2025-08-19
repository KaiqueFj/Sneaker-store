import React from "react";

export default function Category({ children }) {
  return (
    <h2 className="items-center text-2xl text-primary-500 font-semibold">
      {children}
    </h2>
  );
}
