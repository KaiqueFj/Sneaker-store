import { getUserAddressesAction } from '@/actions/address-action';
import AddressesClient from '@/app/_components/account/addresses/AdressesClientComponent';

export default async function Page() {
  const addresses = await getUserAddressesAction();

  return <AddressesClient addresses={addresses} />;
}
