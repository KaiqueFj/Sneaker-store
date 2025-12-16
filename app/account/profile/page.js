import UpdateProfileForm from "@/app/_components/updateProfileForm/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getUser } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  console.log(session);

  const user = await getUser(session.user.email);

  return (
    <div className="p-2 flex flex-col justify-center">
      <h2 className="mb-4 text-2xl  text-center font-semibold text-primary-600">
        Update your guest profile
      </h2>

      <p className="mb-8 text-xl text-center font-medium text-primary-400">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm user={user}></UpdateProfileForm>
    </div>
  );
}
