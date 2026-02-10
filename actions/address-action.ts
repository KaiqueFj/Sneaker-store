"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

type Address = {
  id: string;
  client_id: string;
  label: string;
  recipient_name: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
};

export async function upsertUserAdress(
  formData: FormData,
): Promise<{ message: string; address: Address }> {
  const session = await auth();
  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const clientId = session.user.userId;
  const isDefault = formData.get("is_default") === "on";

  if (isDefault) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("client_id", clientId)
      .eq("is_default", true);
  }

  const adressData = {
    label: formData.get("label"),
    recipient_name: formData.get("recipient_name"),
    street: formData.get("street"),
    number: formData.get("number"),
    complement: formData.get("complement"),
    city: formData.get("city"),
    state: formData.get("state"),
    postal_code: formData.get("postal_code"),
    country: formData.get("country"),
    is_default: isDefault,
  };

  const { data, error } = await supabase
    .from("addresses")
    .upsert(
      {
        id: formData.get("id") || undefined,
        client_id: clientId,
        ...adressData,
      },
      { onConflict: "id" },
    )
    .select()
    .single();

  if (error) throw new Error("Could not save address");

  revalidatePath("/account/addresses");

  return {
    message: "Address saved successfully",
    address: data,
  };
}

export async function removeUserAddress(addressId: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("client_id", session.user.userId)
    .eq("id", addressId);

  if (error) throw error;

  revalidatePath("/account/addresses");
}
