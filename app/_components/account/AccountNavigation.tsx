"use client";

import Link from "next/link";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-primary-600">
        {title}
      </h2>

      <div className="rounded-2xl  bg-white">
        <ul className="">{children}</ul>
      </div>
    </div>
  );
}

function MenuItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center justify-between px-5 py-4
                   text-sm font-medium text-gray-600
                   transition-colors duration-150
                   hover:bg-gray-50"
      >
        <span>{label}</span>

        <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 text-gray-400">
          →
        </span>
      </Link>
    </li>
  );
}

export default function AccountMenu() {
  return (
    <div className="mx-auto w-full max-w-xl px-4">
      <div className="flex flex-col p-4 bg-gray-100/20 gap-8">
        <Section title="Pedidos">
          <MenuItem href="/account/orders" label="Últimos pedidos" />
        </Section>

        <Section title="Conta">
          <MenuItem href="/account/profile" label="Atualizar perfil" />
          <MenuItem href="/account/addresses" label="Endereços" />
          <MenuItem href="/account/updatePassword" label="Atualizar senha" />
        </Section>

        <Section title="Serviços">
          <MenuItem href="/favorites" label="Favoritos" />
        </Section>
      </div>
    </div>
  );
}
