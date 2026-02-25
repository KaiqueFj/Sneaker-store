import { auth } from '@/lib/auth';
import {
  getNewestSneakersService,
  getSneakerDetailsService,
  getSneakerSearchService,
  getSneakersOnSaleService,
  getSneakersService,
} from '@/services/sneakers-service';

export async function getSneakersServiceAction(filterKey?: string, filterValue?: string) {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  return await getSneakersService(userId, filterKey, filterValue);
}

export async function getSneakerSearchServiceAction(searchTerm: string) {
  return await getSneakerSearchService(searchTerm);
}

export async function getSneakerDetailsServiceAction(id: string) {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  return await getSneakerDetailsService(userId, id);
}

export async function getSneakersOnSaleServiceAction() {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  return await getSneakersOnSaleService(userId);
}

export async function getNewestSneakersServiceAction() {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  return await getNewestSneakersService(userId);
}
