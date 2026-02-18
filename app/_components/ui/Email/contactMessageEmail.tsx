import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ContactMessageEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactMessageEmail({
  name,
  email,
  message,
}: ContactMessageEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nova mensagem de contato do projeto</Preview>

      <Tailwind>
        <Body className="bg-gray-100 px-4 py-10 font-sans">
          <Container className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <Text className="text-2xl font-semibold text-gray-900">
              Nova mensagem de contato
            </Text>

            <Section className="mt-6 space-y-2">
              <Text>
                <strong>Nome:</strong> {name}
              </Text>
              <Text>
                <strong>E-mail:</strong> {email}
              </Text>
              <Text className="mt-4">
                <strong>Mensagem:</strong>
              </Text>
              <Text className="text-gray-600">{message}</Text>
            </Section>

            <Text className="mt-8 text-xs text-gray-400 text-center">
              © 2026 Shark Store
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
