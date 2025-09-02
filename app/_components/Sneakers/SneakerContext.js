"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = [];

const SneakerContext = createContext();

function sneakerReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (exists) {
        return state.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "RESTORE_CART":
      return action.payload;

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    default:
      return state;
  }
}
function SneakerProvider({ children }) {
  const [state, dispatch] = useReducer(sneakerReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      dispatch({ type: "RESTORE_CART", payload: JSON.parse(stored) });
    }
  }, []);

  // Keeps the cart synchronized with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <SneakerContext.Provider value={{ state, dispatch, initialState }}>
      {children}
    </SneakerContext.Provider>
  );
}

export const useSneakerContext = () => useContext(SneakerContext);

function useSneaker() {
  const context = useContext(SneakerContext);
  if (!context) {
    throw new Error("useSneaker must be used within a SneakerProvider");
  }
  return context;
}

export { SneakerProvider, useSneaker };
