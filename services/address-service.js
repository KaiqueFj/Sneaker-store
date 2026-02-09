"use server";

import { supabase } from "@/lib/supabase";

export async function fetchAdressByCep(cep) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await res.json();

  if (data.erro) {
    throw new Error(data.erro.msg);
  }

  return {
    city: data.localidade,
    state: data.uf,
  };
}

function calculateShipping(state) {
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

export async function getUserAddresses(userId) {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("client_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getShippingByCep(cep) {
  const address = await fetchAdressByCep(cep);
  const options = calculateShipping(address.state);

  return {
    location: address,
    options,
  };
}
