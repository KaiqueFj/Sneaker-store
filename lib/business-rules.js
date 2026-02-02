export function calculateShipping(state) {
  if (state === "SP") {
    return [
      { type: "Standard", price: 0, days: 3 },
      { type: "Express", price: 10, days: 2 },
    ];
  }

  return [
    { type: "Standard", price: 30, days: 7 },
    { type: "Express", price: 40, days: 4 },
  ];
}
