import { seedSneakersTable } from "@/app/utils/insertDummyData";

export async function GET() {
  await seedSneakersTable();
  return Response.json({ message: "Sneakers seeded successfully" });
}
