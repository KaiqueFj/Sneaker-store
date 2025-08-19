import fs from "fs";
import path from "path";
import { supabase } from "@/app/_lib/supabase.js";

const localImageDir = "../public/_assets/sneakers"; // folder where you have your images locally
const bucketName = "sneakers/sneakers"; // your Supabase bucket name
async function uploadImages() {
  const files = fs.readdirSync(localImageDir);

  for (const file of files) {
    const filePath = path.join(localImageDir, file);
    const fileData = fs.readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`sneakers/${file}`, fileData, { upsert: true });

    if (error) {
      console.error(`Error uploading ${file}:`, error.message);
    } else {
      console.log(`Uploaded: ${file}`);
    }
  }
}

uploadImages();
