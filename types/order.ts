export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  size?: string;
  image: string;
  category: string;
  model: string;
  colors: string[];
  gender: string;
};

export type OrderAddressInput = {
  recipient_name: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type CreateOrderInput = {
  cartItems: CartItem[];
  address: OrderAddressInput;
  total_price: number;
};

export type Order = {
  id: string;
  client_id: string;
  total_price: number;
  created_at: string;
};
