// app/account/addresses/page.tsx
import AddressesClient from "@/app/_components/account/addresses/AdressesClientComponent";
import { auth } from "@/lib/auth";
import { getUserAddresses } from "@/lib/data-service";

export default async function Page() {
  const session = await auth();
  const addresses = await getUserAddresses(session?.user?.userId);

  return <AddressesClient addresses={addresses} />;
}
