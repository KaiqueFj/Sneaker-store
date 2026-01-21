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

export default function ResetPasswordEmail({ resetUrl }) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>

      <Tailwind>
        <Body className="bg-gray-100 px-4 py-10 font-sans">
          <Container className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
            {/* Logo */}
            <Section className="mb-6 text-center">
              <Img
                src="https://i.postimg.cc/T1BqZ7X7/image.png"
                alt="Shark Store"
                width="60"
                height="40"
                className="mx-auto"
              />
            </Section>

            {/* Header */}
            <Text className="text-2xl font-semibold tracking-tight text-gray-900">
              Reset your password
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-gray-600">
              We received a request to reset the password for your account.
              Click the button below to continue.
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
                Reset password
              </Button>
            </Section>

            {/* Expiration */}
            <Text className="mt-6 text-xs text-gray-500">
              This link is valid for <strong>15 minutes</strong>. If it expires,
              you can request a new one.
            </Text>

            {/* Divider */}
            <Section className="my-6 h-px bg-gray-200" />

            {/* Safety */}
            <Text className="text-xs leading-relaxed text-gray-500">
              If you didn’t request a password reset, you can safely ignore this
              email. Your account will remain secure.
            </Text>

            {/* Footer */}
            <Text className="mt-6 text-xs text-gray-400 text-center">
              © 2026 Shark Store. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
