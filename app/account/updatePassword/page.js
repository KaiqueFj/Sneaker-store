import UpdatePasswordForm from "@/app/_components/auth/PasswordReset/PasswordResetForm";

export const metadata = {
  title: "Atualizar senha",
};

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <header className="mb-12 text-center">
        <h2 className="mb-3 text-4xl font-bold tracking-tight text-black">
          Atualizar senha
        </h2>

        <p className="text-sm text-gray-500">
          Mantenha seus dados atualizados para uma experiência mais rápida e
          fluida.
        </p>
      </header>

      <UpdatePasswordForm />
    </div>
  );
}
