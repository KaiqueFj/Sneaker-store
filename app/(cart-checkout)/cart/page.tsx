import Cart from "@/app/_components/cart/Cart";
import { auth } from "@/lib/auth";
import { getUserAddresses } from "@/services/address-service";

export default async function page() {
  const session = await auth();
  const addresses = session?.user
    ? await getUserAddresses(session.user.userId)
    : [];

  const defaultAddress =
    addresses.find((a) => a.is_default) ?? addresses[0] ?? null;

  return (
    <div className="flex justify-center">
      <Cart defaultAddress={defaultAddress} />
    </div>
  );
}
