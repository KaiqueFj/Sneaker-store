"use server";

import { supabaseServer } from "@/lib/supabase-server";
import {
  Address,
  AddressCep,
  Shipping,
  ShippingOptions,
} from "@/types/shipping";

async function fetchAdressByCep(cep?: string): Promise<AddressCep> {
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
      { type: "Normal", price: 0, days: 3 },
      { type: "Expresso", price: 10, days: 2 },
    ];
  }

  return [
    { type: "Normal", price: 30, days: 7 },
    { type: "Expresso", price: 40, days: 4 },
  ];
}

export async function getUserAddresses(userId: string): Promise<Address[]> {
  const { data, error } = await supabaseServer
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
