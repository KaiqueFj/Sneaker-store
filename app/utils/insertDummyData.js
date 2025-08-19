import fs from "fs";
import path from "path";
import { supabase } from "@/app/_lib/supabase";
import { getDummySneakers } from "@/app/utils/getDummyData";

export async function seedSneakersTable() {
  // 2️⃣ Get dummy sneakers data
  const sneakers = getDummySneakers();

  // 3️⃣ Insert into the 'sneakers' table
  const { data, error } = await supabase.from("sneakers").insert(sneakers);

  if (error) {
    console.error("Error inserting sneakers:", error);
  } else {
    console.log("Sneakers inserted:", data);
  }
}
