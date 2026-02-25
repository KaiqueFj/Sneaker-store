'use server';

import { auth } from '@/lib/auth';
import { requireUser } from '@/lib/requireUser';
import {
  getShippingByCep,
  getUserAddressesService,
  removeUserAddressService,
  upsertUserAddressService,
} from '@/services/address-service';
import { AddressInput } from '@/types/shipping';
import { revalidatePath } from 'next/cache';

function parseAddressForm(formData: FormData): AddressInput {
  return {
    id: formData.get('id') as string | undefined,
    label: formData.get('label') as string,
    recipient_name: formData.get('recipient_name') as string,
    street: formData.get('street') as string,
    number: formData.get('number') as string,
    complement: formData.get('complement') as string | undefined,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    postal_code: formData.get('postal_code') as string,
    country: formData.get('country') as string,
    is_default: formData.get('is_default') === 'on',
  };
}

export async function getUserAddressesAction() {
  const session = await auth();
  const userId = session?.user?.userId;

  if (!userId) {
    return [];
  }

  return getUserAddressesService(userId);
}

export async function upsertUserAddress(formData: FormData) {
  const userId = await requireUser();

  const input = parseAddressForm(formData);

  const address = await upsertUserAddressService(userId, input);

  revalidatePath('/account/addresses');

  return {
    message: 'Endereço salvo com sucesso',
    address,
  };
}

export async function getShippingByCepAction(cep: string) {
  return getShippingByCep(cep);
}

export async function removeUserAddress(addressId: string) {
  const userId = await requireUser();

  await removeUserAddressService(userId, addressId);

  revalidatePath('/account/addresses');
}
