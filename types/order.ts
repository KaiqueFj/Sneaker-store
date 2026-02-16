import { ReviewWithRelations } from "@/types/review";

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

export type CreateOrderInput = {
  cartItems: CartItem[];
  address: OrderAddressInput;
  total_price: number;
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

export type OrderItem = ReviewWithRelations & {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string[];
  colors: string[];
  model: string;
};

export type OrderAddress = {
  id: string;
  recipient_name: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  type: "shipping" | "billing";
  created_at: string;
};

export type Order = {
  id: string;
  client_id: string;
  total_price: number | string;
  created_at: string;

  order_items: OrderItem[];
  order_addresses: OrderAddress[];
};
