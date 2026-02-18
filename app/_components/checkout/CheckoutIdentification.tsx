"use client";

import { useSession } from "next-auth/react";

export default function CheckoutIdentification() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-medium">Dados</h2>

      <div className="grid gap-4 rounded-xl border bg-white p-6">
        <InfoRow label="Name" value={session.user.name} />
        <InfoRow label="E-mail" value={session.user.email} />
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
