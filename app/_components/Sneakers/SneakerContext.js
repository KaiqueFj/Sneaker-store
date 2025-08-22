"use client";

import { createContext, useContext, useReducer } from "react";

const initialState = [];

const SneakerContext = createContext();

function sneakerReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}
function SneakerProvider({ children }) {
  const [state, dispatch] = useReducer(sneakerReducer, initialState);

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
