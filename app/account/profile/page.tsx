import UpdateProfileForm from "@/app/_components/account/UpdateProfile/UpdateProfileForm";
import { auth } from "@/lib/auth";
import { getUser } from "@/services/users-service";

export const metadata = {
  title: "Atualizar perfil",
};

export default async function Page() {
  const session = await auth();
  const user = await getUser(session.user.email);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <header className="mb-12 text-center">
        <h2 className="mb-3 text-4xl font-bold tracking-tight text-black">
          Atualizar perfil
        </h2>

        <p className="text-sm text-gray-500">
          Mantenha seus dados atualizados para uma experiência mais rápida e
          fluida.
        </p>
      </header>

      <UpdateProfileForm user={user} />
    </div>
  );
}
