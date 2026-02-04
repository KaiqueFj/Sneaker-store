import UpdateProfileForm from "@/app/_components/auth/UpdateProfile/UpdateProfileForm";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const user = await getUser(session.user.email);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <header className="mb-12 text-center">
        <h2 className="mb-3 text-4xl font-bold tracking-tight text-black">
          Update profile
        </h2>

        <p className="text-sm text-gray-500">
          Keep your details up to date for a faster and smoother experience.
        </p>
      </header>

      <UpdateProfileForm user={user} />
    </div>
  );
}
