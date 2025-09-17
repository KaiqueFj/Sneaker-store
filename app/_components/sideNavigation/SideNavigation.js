"use client";

import {
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "@/app/_components/login/SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="w-5 h-5 text-primary-600" />,
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: <ShoppingCartIcon className="w-5 h-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="w-5 h-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col h-full gap-2 text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-500/20 hover:text-primary-500/50 transition-colors flex items-center gap-4 font-semibold text-primary-500  ${
                pathName === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNavigation;
