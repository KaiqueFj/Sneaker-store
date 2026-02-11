import { createContext, ReactNode, useContext, useReducer } from "react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type OrderState = {
  orderItems: OrderItem[];
  orderId: string | null;
  orderStatus: string | null;
};

type OrderAction =
  | {
      type: "SET_ORDER";
      payload: {
        orderItems: OrderItem[];
        orderId: string;
        orderStatus: string;
      };
    }
  | { type: "RESET_ORDER" };

type OrderContextValue = {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
};

type OrderProviderProps = {
  children: ReactNode;
};

const initialState: OrderState = {
  orderItems: [],
  orderId: null,
  orderStatus: null,
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state,
        orderItems: action.payload.orderItems,
        orderId: action.payload.orderId,
        orderStatus: action.payload.orderStatus,
      };

    case "RESET_ORDER":
      return initialState;

    default:
      return state;
  }
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

function OrderProvider({ children }: OrderProviderProps) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }

  return context;
}

export { OrderProvider, useOrder };
