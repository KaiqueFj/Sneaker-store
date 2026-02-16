export type User = {
  id: string;
  name: string | null;
  passw;
  email: string;
  provider: string;
  created_at: string;
  birthday: string | null;
};

export type DbUser = {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
};

export type CreateUserInput = {
  name?: string | null;
  email: string;
  password: string | null;
  provider: "credentials" | "google" | "github";
};
