import { CouponDiscount } from "@/types/coupom";
import { Address, Shipping } from "@/types/shipping";
import { createContext, ReactNode, useContext, useReducer } from "react";

type CheckoutProviderProps = {
  children: ReactNode;
};

type CheckoutState = {
  cupom: CouponDiscount | null;
  shipping: Shipping | null;
  shippingOptions: Shipping[];
  address: Address | null;
};

const initialState: CheckoutState = {
  cupom: null,
  shipping: null,
  shippingOptions: [],
  address: null,
};

type CheckoutAction =
  | { type: "SET_CUPOM"; payload: CouponDiscount }
  | { type: "REMOVE_CUPOM" }
  | { type: "SET_SHIPPING"; payload: Shipping }
  | { type: "SET_SHIPPING_OPTIONS"; payload: Shipping[] }
  | { type: "REMOVE_SHIPPING" }
  | { type: "SET_ADDRESS"; payload: Address }
  | { type: "REMOVE_ADDRESS" }
  | { type: "RESET_CHECKOUT" };

type CheckoutContextValue = {
  state: CheckoutState;
  dispatch: React.Dispatch<CheckoutAction>;
};

const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined,
);

function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case "SET_CUPOM":
      return { ...state, cupom: action.payload };

    case "REMOVE_CUPOM":
      return { ...state, cupom: null };

    case "SET_SHIPPING":
      return { ...state, shipping: action.payload };

    case "SET_SHIPPING_OPTIONS":
      return { ...state, shippingOptions: action.payload };

    case "REMOVE_SHIPPING":
      return { ...state, shipping: null };

    case "SET_ADDRESS":
      return { ...state, address: action.payload };

    case "REMOVE_ADDRESS":
      return { ...state, address: null };

    case "RESET_CHECKOUT":
      return initialState;

    default:
      return state;
  }
}

function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
}

function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return context;
}

export { CheckoutProvider, useCheckout };
