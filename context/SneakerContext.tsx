"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  colors: string[];
  gender: string;
  model: string;
  image: string;
  size: string;
  quantity: number;
};

type SneakerState = {
  items: CartItem[];
  lastAdded: CartItem | null;
};

type SneakerAction =
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_FROM_CART"; payload: { id: string; size: string } }
  | { type: "DECREASE_QUANTITY"; payload: { id: string; size: string } }
  | { type: "CLEAR_CART" }
  | { type: "RESTORE_CART"; payload: SneakerState };

type SneakerContextValue = {
  state: SneakerState;
  dispatch: React.Dispatch<SneakerAction>;
};

type SneakerProviderProps = {
  children: ReactNode;
};

const initialState: SneakerState = {
  items: [],
  lastAdded: null,
};

function sneakerReducer(
  state: SneakerState,
  action: SneakerAction,
): SneakerState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size,
      );

      let updatedItems: CartItem[];

      if (exists) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        lastAdded: { ...action.payload, quantity: 1 },
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            ),
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return {
        items: [],
        lastAdded: null,
      };

    case "RESTORE_CART":
      return action.payload;

    default:
      return state;
  }
}

const SneakerContext = createContext<SneakerContextValue | undefined>(
  undefined,
);

function SneakerProvider({ children }: SneakerProviderProps) {
  const [state, dispatch] = useReducer(sneakerReducer, initialState);

  // Restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      dispatch({
        type: "RESTORE_CART",
        payload: JSON.parse(stored) as SneakerState,
      });
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

function useSneaker() {
  const context = useContext(SneakerContext);

  if (!context) {
    throw new Error("useSneaker must be used within a SneakerProvider");
  }

  return context;
}

export { SneakerProvider, useSneaker };
