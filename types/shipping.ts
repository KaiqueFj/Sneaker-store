export type Address = {
  id: string;
  client_id: string;
  label: string;
  recipient_name: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  city: string;
  state: string;
};

export type AddressInput = {
  id?: string;
  label: string;
  recipient_name: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
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
  is_default: boolean;
};
