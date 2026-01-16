import ResetPasswordForm from "@/app/_components/PasswordReset/ResetPasswordForm";

export default async function page({ params }) {
  const { token } = await params;

  return <ResetPasswordForm token={token} />;
}
