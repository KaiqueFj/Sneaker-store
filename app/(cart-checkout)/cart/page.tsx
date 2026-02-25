import { getUserAddressesAction } from '@/actions/address-action';
import Cart from '@/app/_components/cart/Cart';

export default async function page() {
  const addresses = (await getUserAddressesAction()) ?? [];
  const defaultAddress = addresses.find((a) => a.is_default) ?? addresses[0] ?? null;

  return (
    <div className="flex justify-center">
      <Cart defaultAddress={defaultAddress} />
    </div>
  );
}
