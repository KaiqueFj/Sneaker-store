import { auth } from "../../lib/auth";
import AccountMenu from "../_components/sideNavigation/Navigation";

export const metadata = {
  title: "Account",
};

export default async function page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col p-4 items-center ">
        <h2 className="text-2xl font-semibold text-accent-400 mb-7">
          Welcome, {firstName}
        </h2>
        <p className="text-lg text-center text-primary-600/60">
          Take a look at your account details, recent orders and manage your
          profile
        </p>
      </div>

      <AccountMenu />
    </div>
  );
}
