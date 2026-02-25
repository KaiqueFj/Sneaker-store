import { supabaseServer } from '@/lib/supabase-server';
import { ProductRow } from '@/types/product';

const PRODUCT_WITH_RELATIONS = `
  *,
  sales (
    discountPercentage,
    startDate,
    endDate
  ),
  favorites (
    id,
    client_id
  )
`;

const PRODUCT_WITH_FAVORITES = `
  *,
  favorites (
    id,
    client_id
  )
`;

export async function getSneakers(filterKey?: string, filterValue?: string) {
  let query = supabaseServer.from('products').select(PRODUCT_WITH_RELATIONS).order('name');

  if (filterKey && filterValue) {
    if (['gender', 'category'].includes(filterKey)) {
      query = query.contains(filterKey, [filterValue]);
    } else {
      query = query.ilike(filterKey, `%${filterValue}%`);
    }
  }

  const { data, error } = await query;

  if (error || !data) {
    throw new Error('Não foi possível carregar os produtos');
  }

  return data;
}

export async function getSneakerSearch(searchTerm: string) {
  const { data, error } = await supabaseServer
    .from('products')
    .select(PRODUCT_WITH_RELATIONS)
    .ilike('name', `%${searchTerm}%`);

  if (error || !data) {
    throw new Error('Não foi possível carregar os produtos');
  }

  return data;
}

export async function getSneakerDetails(id: string) {
  const { data, error } = await supabaseServer
    .from('products')
    .select(PRODUCT_WITH_FAVORITES)
    .eq('id', id)
    .single<ProductRow>();

  if (error || !data) {
    throw new Error('Não foi possível carregar o produto');
  }

  return data;
}

export async function getSneakersOnSale() {
  const { data, error } = await supabaseServer
    .from('products')
    .select(PRODUCT_WITH_RELATIONS)
    .not('sales', 'is', null)
    .order('name');

  if (error || !data) {
    throw new Error('Não foi possível carregar os produtos em promoção');
  }

  return data;
}

export async function getNewestSneakers() {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const { data, error } = await supabaseServer
    .from('products')
    .select(PRODUCT_WITH_FAVORITES)
    .gte('created_at', threeMonthsAgo.toISOString())
    .order('created_at', { ascending: false });

  if (error || !data) {
    throw new Error('Sneakers could not be loaded');
  }

  return data;
}
