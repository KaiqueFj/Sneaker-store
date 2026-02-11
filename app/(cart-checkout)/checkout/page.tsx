import CheckoutComponent from "@/app/_components/checkout/CheckoutComponent";
import { auth } from "@/lib/auth";
import { getUserAddresses } from "@/services/address-service";

export default async function Page() {
  const session = await auth();
  const addresses = await getUserAddresses(session?.user?.userId);

  return <CheckoutComponent addresses={addresses} />;
}
