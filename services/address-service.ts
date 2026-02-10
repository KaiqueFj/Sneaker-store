"use server";

import { supabase } from "@/lib/supabase";

type Address = {
  city: string;
  state: string;
};

type Shipping = {
  type: string;
  price: number;
  days: number;
};

type ShippingOptions = {
  location: Address;
  options: Shipping[];
};

type UserAddress = {
  city: string;
  state: string;
  client_id: string;
  created_at: string;
};

async function fetchAdressByCep(cep?: string): Promise<Address> {
  if (!cep) {
    throw new Error("CEP is required");
  }

  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await res.json();

  if (data.erro) {
    throw new Error("Invalid CEP");
  }

  return {
    city: data.localidade,
    state: data.uf,
  };
}

function calculateShipping(state?: string): Shipping[] {
  if (state === "SP") {
    return [
      { type: "Standard", price: 0, days: 3 },
      { type: "Express", price: 10, days: 2 },
    ];
  }

  return [
    { type: "Standard", price: 30, days: 7 },
    { type: "Express", price: 40, days: 4 },
  ];
}

export async function getUserAddresses(userId: string): Promise<UserAddress[]> {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("client_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getShippingByCep(cep?: string): Promise<ShippingOptions> {
  const address = await fetchAdressByCep(cep);
  const options = calculateShipping(address.state);

  return {
    location: address,
    options,
  };
}
