"use client";

import { forgotPassword } from "@/lib/data-service";

export default function page() {
  const handleBtnClic = () => {
    forgotPassword("kaiqueferraz.dev@gmail.com");
  };
  return (
    <div>
      <button onClick={handleBtnClic}>Teste</button>
    </div>
  );
}
