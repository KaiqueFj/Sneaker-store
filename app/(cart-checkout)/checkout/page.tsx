import { getUserAddressesAction } from '@/actions/address-action';
import CheckoutComponent from '@/app/_components/checkout/CheckoutComponent';

export default async function Page() {
  const addresses = await getUserAddressesAction();

  return <CheckoutComponent addresses={addresses} />;
}
