"use client";

import Link from "next/link";

function Section({ title, children }) {
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

function MenuItem({ href, label }) {
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
        <Section title="Orders">
          <MenuItem href="/account/orders" label="Last orders" />
        </Section>

        <Section title="Account">
          <MenuItem href="/account/profile" label="Update profile" />
          <MenuItem href="/account/addresses" label="Addresses" />
          <MenuItem href="/account/updatePassword" label="Update password" />
        </Section>

        <Section title="Services">
          <MenuItem href="/favorites" label="Favorites" />
        </Section>
      </div>
    </div>
  );
}
