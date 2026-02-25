'use server';

import {
  createUser,
  getUser,
  getUserByHashedToken,
  getUserById,
  getUsersForAuth,
  resetUserPassword,
  setUserResetToken,
  updatedUserPassword,
  updateUser,
} from '@/repository/users-repository';
import { AuthUser, CreateUserInput, PublicUser } from '@/types/user';
import { revalidatePath } from 'next/cache';

// --- CREATE
export async function createUserService(user: CreateUserInput): Promise<PublicUser> {
  return createUser(user);
}

// --- GET
export async function getUserServiceById(userId: string): Promise<PublicUser | null> {
  return getUserById(userId);
}

export async function getUserServiceByEmail(email: string): Promise<PublicUser | null> {
  return getUser(email);
}

export async function getUserForAuthService(email: string): Promise<AuthUser | null> {
  return getUsersForAuth(email);
}

export async function getUserByHashedTokenService(token: string): Promise<AuthUser | null> {
  return getUserByHashedToken(token);
}

// --- UPDATE
export async function updateUserProfileService(
  userId: string,
  updateData: { email?: string; name?: string; birthday?: string },
) {
  revalidatePath('/account/profile');

  return updateUser(updateData, userId);
}

export async function updateUserPasswordService(userId: string, hashedPassword: string) {
  return updatedUserPassword(hashedPassword, userId);
}

export async function resetUserPasswordService(hashedToken: string, hashedPassword: string) {
  const user = await getUserByHashedTokenService(hashedToken);
  if (!user) throw new Error('Token inválido ou expirado');

  return resetUserPassword(user.id, hashedPassword);
}

// --- RESET TOKEN
export async function setResetTokenService(userId: string, hashedToken: string, expiresAt: Date) {
  return setUserResetToken(userId, hashedToken, expiresAt);
}
