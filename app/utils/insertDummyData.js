import { supabase } from "@/app/_lib/supabase";
import { getSneakersFromApi } from "./getDummyData";

export async function seedSneakersTable() {
  try {
    const sneakers = await getSneakersFromApi();

    const { data, error } = await supabase.from("sneakers").insert(sneakers);

    if (error) {
      console.error("❌ Error inserting sneakers:", error);
    } else {
      console.log(`✅ Successfully inserted ${data.length} sneakers`);
    }
  } catch (err) {
    console.error("❌ Failed to seed sneakers:", err);
  }
}
