import { supabaseServer } from '@/lib/supabase-server';
import { ReviewWithRelations } from '@/types/review';

export async function getSneakersReview(SneakerId: string) {
  const { data, error } = await supabaseServer
    .from('reviews')
    .select(`*, products (rating_avg, rating_count), users (name)`)
    .eq('product_id', SneakerId);

  if (error) {
    throw new Error('Não foi possível carregar as avaliações');
  }

  return data ?? [];
}

export async function getUsersReviews(sneakerId: string): Promise<ReviewWithRelations[] | null> {
  const { data, error } = await supabaseServer
    .from('reviews')
    .select(`*, products (rating_avg, rating_count), users (name)`)
    .eq('product_id', sneakerId)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Não foi possível carregar as avaliações');

  return data ?? [];
}

export async function getUserReviews(userId: string): Promise<ReviewWithRelations[]> {
  const { data, error } = await supabaseServer
    .from('reviews')
    .select(`*, products (rating_avg, rating_count), users (name)`)
    .eq('client_id', userId);

  if (error) throw new Error('Não foi possível carregar as avaliações');

  return data ?? [];
}

export async function upsertReview(userId: string, sneakerId: string, comment: string, rating: number) {
  const { data, error } = await supabaseServer
    .from('reviews')
    .upsert(
      {
        product_id: sneakerId,
        client_id: userId,
        rating,
        comment,
      },
      { onConflict: 'client_id,product_id' },
    )
    .select()
    .single();

  if (error) {
    throw new Error('Não foi possível carregar as avaliações');
  }

  return data;
}
