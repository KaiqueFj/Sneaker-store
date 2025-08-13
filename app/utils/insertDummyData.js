import { supabase } from "@/app/_lib/supabase";
import { getDummySneakers } from "@/app/utils/getDummyData";

export async function seedSneakersTable() {
  const sneakers = getDummySneakers();

  // Insert into your 'sneakers' table
  const { data, error } = await supabase.from("sneakers").insert(sneakers);

  if (error) {
    console.error("Error inserting sneakers:", error);
  } else {
    console.log("Sneakers inserted:", data);
  }
}
