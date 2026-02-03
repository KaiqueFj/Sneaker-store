const { createContext, useReducer, useContext } = require("react");

const initialState = {
  orderItems: [],
  orderId: null,
  orderStatus: null,
};

const OrderContext = createContext();

function OrderProvider({ children }) {
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
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
}

export { OrderProvider, useOrder };
