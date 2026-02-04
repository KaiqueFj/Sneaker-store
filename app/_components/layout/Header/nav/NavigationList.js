import Link from "next/link";

import SignOutButton from "@/app/_components/auth/Login/SignOutButton";

export default function NavigationList({
  navItems,
  className = "",
  classNameLi = "",
  onItemClick,
}) {
  return (
    <ul className={`flex  ${className}`}>
      {navItems.map((nav) => (
        <li
          key={nav.label}
          className={`relative px-4 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full ${classNameLi}`}
          onClick={onItemClick}
        >
          {nav.href ? (
            <Link href={nav.href}>{nav.label}</Link>
          ) : (
            <SignOutButton />
          )}
        </li>
      ))}
    </ul>
  );
}
