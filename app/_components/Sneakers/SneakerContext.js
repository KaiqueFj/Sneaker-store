"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  items: [],
  lastAdded: null,
};

const SneakerContext = createContext();

function sneakerReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      let updatedItems;
      if (exists) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        lastAdded: action.payload,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        lastAdded: null,
      };

    case "RESTORE_CART":
      return action.payload;

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            )
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
}

function SneakerProvider({ children }) {
  const [state, dispatch] = useReducer(sneakerReducer, initialState);

  // Restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      dispatch({ type: "RESTORE_CART", payload: JSON.parse(stored) });
    }
  }, []);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <SneakerContext.Provider value={{ state, dispatch }}>
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
