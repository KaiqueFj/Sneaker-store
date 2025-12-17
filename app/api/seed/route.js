import { seedSneakersTable } from "../../../utils/insertDummyData";

export async function GET() {
  await seedSneakersTable();
  return Response.json({ message: "Sneakers seeded successfully" });
}
