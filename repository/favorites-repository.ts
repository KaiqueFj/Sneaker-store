import { supabaseServer } from '@/lib/supabase-server';

export async function createFavorite(userId: string, sneakerId: string) {
  const { data, error } = await supabaseServer.from('favorites').insert({
    product_id: sneakerId,
    client_id: userId,
  });

  if (error) {
    throw new Error('Erro ao adicionar favorito');
  }

  return data;
}

export async function removeFavorite(userId: string, sneakerId: string) {
  const { data, error } = await supabaseServer
    .from('favorites')
    .delete()
    .eq('client_id', userId)
    .eq('product_id', sneakerId);

  if (error) {
    throw new Error('Erro ao remover favorito');
  }
  return data;
}

export async function getFavorites(userId: string) {
  const { data, error } = await supabaseServer
    .from('favorites')
    .select(
      `
        id,
        products (
          id,
          name,
          price,
          category,
          images,
          sizes,
          colors,
          gender,
          model,
          rating_avg,
          rating_count
        )
      `,
    )
    .eq('client_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Erro ao carregar favoritos');
  }

  return data;
}
