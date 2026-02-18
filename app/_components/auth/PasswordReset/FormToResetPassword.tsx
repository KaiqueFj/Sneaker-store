"use client";

import { resetPassword } from "@/actions/user-action";
import Logo from "@/app/_components/layout/Header/logo/Logo";
import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      await toast.promise(resetPassword(formData), {
        loading: "Redefinindo senha...",
        success: (data) => {
          router.push("/login");
          return data.message;
        },
        error: (err) => err.message,
      });
    } catch {}
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-lg">
        {/* Optional brand */}
        <div className="mb-10 flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">
            <Logo />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold leading-tight text-gray-900">
          Crie uma nova senha
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          Escolha uma nova senha para acessar sua conta.
        </p>

        <Form action={handleSubmit} className="mt-8 ">
          {/* Password */}
          <Form.Field>
            <Form.Label>Senha</Form.Label>
            <Form.Input
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </Form.Field>

          {/* Confirm password */}
          <Form.Field>
            <Form.Label>Confirmar senha</Form.Label>
            <Form.Input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
          </Form.Field>

          {/* Helper text */}
          <p className="text-xs text-gray-500">
            {
              "Certifique-se de que tenha pelo menos 15 caracteres OU pelo menos 8 caracteres"
            }
          </p>

          <Form.Field>
            <Form.Input type="hidden" name="token" value={token} />
          </Form.Field>

          {/* Actions */}
          <div className="flex items-center justify-end  gap-4">
            <Link
              href="/login"
              className="text-base text-primary-600 border-primary-600/20 border-2 px-8 py-3 rounded-full hover:border-primary-600 transition"
            >
              Cancelar
            </Link>
            <Button
              pendingLabel="Redefinindo..."
              variant="primary"
              size="lg"
              className="font-medium"
            >
              Redefinir senha
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
