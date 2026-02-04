import ResetPasswordForm from "@/app/_components/Forms/PasswordReset/ResetPasswordForm";

export default async function page({ params }) {
  const { token } = await params;

  return <ResetPasswordForm token={token} />;
}
