import { auth } from "../../../lib/auth";
import { getUser } from "../../../lib/data-service";
import UpdateProfileForm from "../../_components/updateProfileForm/UpdateProfileForm";

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
