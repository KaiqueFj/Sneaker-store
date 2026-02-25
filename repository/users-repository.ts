import { supabaseServer } from '@/lib/supabase-server';
import { CreateUserInput } from '@/types/user';

const PUBLIC_USER_FIELDS = 'id, email, name, image, created_at, birthday, provider';
const AUTH_USER_FIELDS = 'id, email, name, password';

// Create a new user
export async function createUser(user: CreateUserInput) {
  const { data, error } = await supabaseServer.from('users').insert(user).select(PUBLIC_USER_FIELDS).single();
  if (error || !data) throw new Error('Não foi possível criar o usuário');
  return data;
}

export async function getUserById(userId: string) {
  const { data, error } = await supabaseServer.from('users').select(PUBLIC_USER_FIELDS).eq('id', userId).maybeSingle();
  if (error) throw new Error('Falha ao buscar o usuário');
  return data;
}

// Get public user info by email
export async function getUser(email: string) {
  const { data, error } = await supabaseServer
    .from('users')
    .select(PUBLIC_USER_FIELDS)
    .eq('email', email)
    .maybeSingle();
  if (error) {
    console.log(error);
    throw new Error('Falha ao buscar o usuário');
  }
  return data;
}

// Get user for authentication (password)
export async function getUsersForAuth(email: string) {
  const { data, error } = await supabaseServer.from('users').select(AUTH_USER_FIELDS).eq('email', email).maybeSingle();
  if (error) throw new Error('Falha ao buscar o usuário');
  return data;
}

// Get user by hashed reset token
export async function getUserByHashedToken(token: string) {
  const now = new Date().toISOString();
  const { data, error } = await supabaseServer
    .from('users')
    .select(AUTH_USER_FIELDS)
    .eq('reset_token_hash', token)
    .gt('reset_token_expires_at', now)
    .maybeSingle();
  if (error) throw new Error('Validação de token falhou');
  return data;
}

// Update profile fields
export async function updateUser(user: { email?: string; name?: string; birthday?: string }, userId: string) {
  const { data, error } = await supabaseServer.from('users').update(user).eq('id', userId);
  if (error || !data) throw new Error('Não foi possível atualizar o usuário');
  return data;
}

// Reset password using token or profile
export async function resetUserPassword(userId: string, hashedPassword: string) {
  const { data, error } = await supabaseServer
    .from('users')
    .update({ password: hashedPassword, reset_token_hash: null, reset_token_expires_at: null })
    .eq('id', userId);
  if (error) throw new Error('Algo deu errado. Por favor, tente novamente.');
  return data;
}

// Update password directly
export async function updatedUserPassword(hashedPassword: string, userId: string) {
  const { data, error } = await supabaseServer.from('users').update({ password: hashedPassword }).eq('id', userId);
  if (error) throw new Error('Algo deu errado. Por favor, tente novamente.');
  return data;
}

// Get user by email for sending reset link
export async function getUserEmailForEmail(email: string) {
  const { data: user } = await supabaseServer
    .from('users')
    .select('id, email, provider')
    .eq('email', email)
    .maybeSingle();

  if (!user || user.provider === 'google') return null;
  return user;
}

export async function setUserResetToken(userId: string, hashedToken: string, expiresAt: Date) {
  const { data, error } = await supabaseServer
    .from('users')
    .update({ reset_token_hash: hashedToken, reset_token_expires_at: expiresAt })
    .eq('id', userId);

  if (error) throw new Error('Algo deu errado ao criar o token.');
  return data;
}
