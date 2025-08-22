"use client";

import { createContext, useContext, useReducer } from "react";

const initialState = [];

const SneakerContext = createContext();

function sneakerReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
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
