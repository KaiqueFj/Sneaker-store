import ResetPasswordForm from "@/app/_components/auth/PasswordReset/FormToResetPassword";

export default async function page({ params }: { params: { token: string } }) {
  const { token } = await params;

  return <ResetPasswordForm token={token} />;
}
