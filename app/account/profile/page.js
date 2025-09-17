import UpdateProfileForm from "@/app/_components/updateProfileForm/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getUser } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const user = await getUser(session.user.email);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm user={user}></UpdateProfileForm>
    </div>
  );
}
