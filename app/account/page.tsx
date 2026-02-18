import AccountMenu from "@/app/_components/account/AccountNavigation";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Account",
};

export default async function page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-black">
          Olá, {firstName}
        </h2>

        <p className="max-w-sm text-sm text-gray-500">
          Veja seus pedidos e atualize suas informações de contato e endereço.
        </p>
      </div>

      <AccountMenu />
    </div>
  );
}
