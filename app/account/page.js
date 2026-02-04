import { auth } from "../../lib/auth";
import AccountMenu from "../_components/layout/AccountMenu/Navigation";

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
          Welcome, {firstName}
        </h2>

        <p className="max-w-sm text-sm text-gray-500">
          View your orders, manage your account, and update your personal
          information.
        </p>
      </div>

      <AccountMenu />
    </div>
  );
}
