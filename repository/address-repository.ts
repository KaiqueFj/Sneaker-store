import { supabaseServer } from '@/lib/supabase-server';
import { AddressInput } from '@/types/shipping';

export async function resetDefaultAddress(userId: string) {
  const { data, error } = await supabaseServer
    .from('addresses')
    .update({ is_default: false })
    .eq('client_id', userId)
    .eq('is_default', true);

  if (error) {
    throw new Error('Erro ao resetar endereço');
  }

  return data;
}

export async function upsertAddress(userId: string, input: AddressInput) {
  const { data, error } = await supabaseServer
    .from('addresses')
    .upsert(
      {
        id: input.id ?? undefined,
        client_id: userId,
        ...input,
      },
      { onConflict: 'id' },
    )
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao salvar endereço');
  }

  return data;
}

export async function getUserAddresses(userId: string) {
  const { data, error } = await supabaseServer
    .from('addresses')
    .select('*')
    .eq('client_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
    throw new Error('Erro ao buscar endereços');
  }
  return data;
}

export async function deleteAddress(userId: string, addressId: string) {
  const { data, error } = await supabaseServer.from('addresses').delete().eq('client_id', userId).eq('id', addressId);

  if (error) {
    throw new Error('Erro ao remover endereço');
  }

  return data;
}
