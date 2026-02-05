const { createContext, useReducer, useContext } = require("react");

const initialState = {
  cupom: null,
  shipping: null,
  address: null,
};

const CheckoutContext = createContext();

function checkoutReducer(state, action) {
  switch (action.type) {
    case "SET_CUPOM":
      return {
        ...state,
        cupom: action.payload,
      };

    case "REMOVE_CUPOM":
      return {
        ...state,
        cupom: null,
      };

    case "SET_SHIPPING":
      return {
        ...state,
        shipping: action.payload,
      };

    case "SET_SHIPPING_OPTIONS":
      return {
        ...state,
        shippingOptions: action.payload,
      };

    case "REMOVE_SHIPPING":
      return {
        ...state,
        shipping: null,
      };

    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    case "REMOVE_ADDRESS":
      return {
        ...state,
        address: null,
      };

    case "RESET_CHECKOUT":
      return initialState;

    default:
      return state;
  }
}

function CheckoutProvider({ children }) {
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
