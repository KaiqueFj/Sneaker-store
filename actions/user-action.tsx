'use server';

import ResetUserPasswordEmail from '@/app/_components/ui/Email/ResetUserPasswordEmail';
import ContactMessageEmail from '@/app/_components/ui/Email/contactMessageEmail';
import sendMail from '@/lib/mailer';
import { requireUser } from '@/lib/requireUser';
import {
  createUserService,
  getUserServiceByEmail,
  getUserServiceById,
  resetUserPasswordService,
  setResetTokenService,
  updateUserPasswordService,
  updateUserProfileService,
} from '@/services/users-service';
import { createResetToken } from '@/utils/helpers';
import { pretty, render } from '@react-email/render';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { signIn, signOut } from 'next-auth/react';
import { JSX } from 'react';

// ----------------------------
// Helpers
// ----------------------------

async function validateAndHashPassword(newPassword: string, confirmPassword: string): Promise<string> {
  if (!newPassword || !confirmPassword) throw new Error('As senhas são necessárias');
  if (newPassword.length < 8 || confirmPassword.length < 8) throw new Error('A senha deve ter pelo menos 8 caracteres');
  if (newPassword !== confirmPassword) throw new Error('As senhas não coincidem');
  return await bcrypt.hash(newPassword, 12);
}

async function sendEmail(to: string, subject: string, component: JSX.Element) {
  const rendered = await render(component);
  const html = await pretty(rendered);
  await sendMail({ to, subject, html });
}

// ----------------------------
// Actions
// ----------------------------

// Get authenticated user info
export async function getUserAction() {
  const userId = await requireUser();
  return await getUserServiceById(userId);
}

// Sign up a new user
export async function signUpNewUserAction(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) throw new Error('Email e senha são obrigatórios');

  const existingUser = await getUserServiceByEmail(email);
  if (existingUser) throw new Error('Usuário já existe');

  const hashedPassword = await bcrypt.hash(password, 12);

  await createUserService({ name, email, password: hashedPassword, provider: 'credentials' });

  return { message: 'Conta criada com sucesso' };
}

// Sign in / out
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

// Update user profile
export async function updateUserProfileAction(formData: FormData) {
  const userId = await requireUser();

  const updateData: Partial<{ email: string; name: string; birthday: string }> = {
    email: formData.get('email')?.toString() || undefined,
    name: formData.get('name')?.toString() || undefined,
    birthday: formData.get('birthday')?.toString() || undefined,
  };

  const data = await updateUserProfileService(userId, updateData);

  return { message: 'Perfil atualizado com sucesso', ok: true, data };
}

// Reset password via token
export async function resetPasswordAction(formData: FormData) {
  const password = formData.get('password')?.toString();
  const confirm = formData.get('confirmPassword')?.toString();
  const token = formData.get('token')?.toString();

  if (!token) throw new Error('Solicitação inválida');

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const hashedPassword = await validateAndHashPassword(password!, confirm!);

  const data = await resetUserPasswordService(hashedToken, hashedPassword);

  return { message: 'Senha atualizada com sucesso', data };
}

// Update password (authenticated)
export async function updateUserPasswordAction(formData: FormData) {
  const userId = await requireUser();

  const newPassword = formData.get('New-password')?.toString();
  const reenterPassword = formData.get('Reenter-password')?.toString();

  const hashedPassword = await validateAndHashPassword(newPassword!, reenterPassword!);

  const data = await updateUserPasswordService(userId, hashedPassword);

  return { message: 'Senha atualizada com sucesso', data };
}

// Send reset link email
export async function sendResetPasswordLinkToEmailAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  if (!email) throw new Error('Email é obrigatório');

  const user = await getUserServiceByEmail(email);
  if (!user) return { message: 'Se existir uma conta com este email, um link de redefinição foi enviado.' };

  const { hashedToken, rawToken } = createResetToken();
  await setResetTokenService(user.id, hashedToken, new Date(Date.now() + 10 * 60 * 1000));

  const resetUrl = `${process.env.NEXTAUTH_URL?.replace(/\/$/, '')}/password-reset/${rawToken}`;

  await sendEmail(user.email, 'Link para redefinir sua senha', <ResetUserPasswordEmail resetUrl={resetUrl} />);

  return { message: 'Se existir uma conta com este email, um link de redefinição foi enviado.' };
}

// Send contact message
export async function sendContactMessageAction(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString();

  if (!name || !email || !message) throw new Error('Todos os campos são obrigatórios.');

  await sendEmail(
    process.env.EMAIL_USER!,
    'Nova mensagem de contato',
    <ContactMessageEmail name={name} email={email} message={message} />,
  );

  return { message: 'Mensagem enviada com sucesso.' };
}
