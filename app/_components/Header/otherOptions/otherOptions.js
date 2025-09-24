"use client";

import Link from "next/link";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSneaker } from "../../../context/SneakerContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignOutButton from "../../login/SignOutButton";
import SearchBar from "./SearchBar";

export default function OtherOptions() {
  const { state } = useSneaker();
  const { data: session } = useSession();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex  items-center gap-2 text-md">
      {/* Search bar */}
      <div className="hidden md:flex">
        <SearchBar />
      </div>

      {/* Cart button */}
      <Link href="/cart">
        <button className="relative transition-colors rounded-xl p-2 hover:bg-gray-300">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <ShoppingBagIcon className="text-primary-600 w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute inset-0 flex items-center justify-center mt-2 text-[9px] font-bold text-primary-600 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </button>
      </Link>

      {/* Favorites button */}
      <button className="transition-colors rounded-xl p-2 hover:bg-gray-300">
        <HeartIcon className="text-primary-600 w-6 h-6 " />
      </button>

      {/* User dropdown */}
      <div className="relative group">
        {session?.user ? (
          <>
            <button className="transition-colors rounded-full p-2 hover:bg-gray-300 flex items-center gap-2">
              {session.user.image ? (
                <Image
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  referrerPolicy="no-referrer"
                  width={32}
                  height={32}
                />
              ) : (
                <UserCircleIcon className="text-primary-600 w-6 h-6" />
              )}
              <span className="hidden text-primary-600 sm:inline">
                {session.user.name.split(" ")[0]}
              </span>
            </button>

            <div className="absolute right-0  w-40 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
              <ul className="flex flex-col text-sm text-color-primary-400-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/account">Account</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/orders">Orders</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <SignOutButton />
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link
            href="/account"
            className="transition-colors hover:text-accent-400 flex items-center gap-2"
          >
            <UserCircleIcon className="text-primary-600 w-6 h-6" />
            <span className="text-primary-600 sm:inline">Guest area</span>
          </Link>
        )}
      </div>
    </div>
  );
}
