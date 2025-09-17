import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

export default async function page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <h2 className="text-2xl font-semibold text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
