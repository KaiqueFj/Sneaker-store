export type DbUser = {
  id: string;
  name: string | null;
  password: string | null;
  email: string;
  provider: string;
  created_at: string;
  birthday: string | null;
  reset_token_hash?: string | null;
  reset_token_expires_at?: string | null;
};

export type PublicUser = Omit<DbUser, 'password' | 'reset_token_hash' | 'reset_token_expires_at'>;

export type AuthUser = Pick<DbUser, 'id' | 'email' | 'name' | 'password'>;

export type updateUserTp = Pick<DbUser, 'id' | 'email' | 'name' | 'birthday'>;

export type CreateUserInput = {
  name?: string | null;
  email: string;
  password: string | null;
  provider: 'credentials' | 'google' | 'github';
};
