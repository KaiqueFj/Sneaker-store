import UpdatePasswordForm from "@/app/_components/updatePasswordForm/UpdatePasswordForm";

export const metadata = {
  title: "Update Password",
};

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <header className="mb-12 text-center">
        <h2 className="mb-3 text-4xl font-bold tracking-tight text-black">
          Update Password
        </h2>

        <p className="text-sm text-gray-500">
          Keep your details up to date for a faster and smoother experience.
        </p>
      </header>

      <UpdatePasswordForm />
    </div>
  );
}
