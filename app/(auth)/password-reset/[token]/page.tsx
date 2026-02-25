import ResetPasswordForm from "@/app/_components/auth/PasswordReset/FormToResetPassword";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function Page({ params }: Props) {
  const { token } = await params;

  return <ResetPasswordForm token={token} />;
}
