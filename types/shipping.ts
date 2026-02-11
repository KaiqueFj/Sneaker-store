export type Address = {
  id: string;
  client_id: string;
  label: string;
  recipient_name: string;
  street: string;
  number: string;
  complement: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  city: string;
  state: string;
};

export type AddressCep = {
  city: string;
  state: string;
};

export type Shipping = {
  type: string;
  price: number;
  days: number;
};

export type ShippingOptions = {
  location: AddressCep;
  options: Shipping[];
};

export type UserAddress = {
  city: string;
  state: string;
  client_id: string;
  created_at: string;
};
