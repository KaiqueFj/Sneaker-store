import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ResetUserPasswordEmail({
  resetUrl,
}: {
  resetUrl: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Redefina sua senha</Preview>

      <Tailwind>
        <Body className="bg-gray-100 px-4 py-10 font-sans">
          <Container className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
            {/* Logo */}
            <Section className="mb-6 text-center">
              <Img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Ficonen-gratis%2Fnike_318-565950.jpg&f=1&nofb=1&ipt=687890fd7f3b648309272347a073437169025728ff0d3f2fe08c131de3aff42d"
                alt="Shark Store"
                width="60"
                height="60"
                className="mx-auto"
              />
            </Section>

            {/* Header */}
            <Text className="text-2xl font-semibold tracking-tight text-gray-900">
              Redefina sua senha
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-gray-600">
              Recebemos uma solicitação para redefinir a senha da sua conta.
              Clique no botão abaixo para continuar.
            </Text>

            {/* CTA — EMAIL SAFE */}
            <Section className="mt-8 text-center bg-white">
              <Button
                href={resetUrl}
                className="
      bg-[#111111]
      text-white
      rounded-lg
      px-6 py-3
      text-sm
      font-medium
      border border-[#111111]
    "
              >
                Redefinir senha
              </Button>
            </Section>

            {/* Expiration */}
            <Text className="mt-6 text-xs text-gray-500">
              Este link é válido por <strong>15 minutos</strong>. Se expirar,
              você pode solicitar outro.
            </Text>

            {/* Divider */}
            <Section className="my-6 h-px bg-gray-200" />

            {/* Safety */}
            <Text className="text-xs leading-relaxed text-gray-500">
              Se você não solicitou a redefinição de senha, pode ignorar este
              e-mail com segurança. Sua conta permanecerá protegida.
            </Text>

            {/* Footer */}
            <Text className="mt-6 text-xs text-gray-400 text-center">
              © 2026 Shark Store. Todos os direitos reservados.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
