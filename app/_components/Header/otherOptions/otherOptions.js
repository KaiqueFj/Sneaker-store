"use client";

import Link from "next/link";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSneaker } from "../../../context/SneakerContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function OtherOptions() {
  const { state } = useSneaker();
  const { data: session } = useSession();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex items-center gap-2 text-md">
      {/* Search bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="relative p-0.5 pl-6 rounded-4xl text-primary-500 border border-primary-300 w-50 focus:outline-none focus:border-primary-500"
        />
        <MagnifyingGlassIcon className="absolute text-primary-500 w-4.5 h-4.5 ml-1.5 " />
      </div>

      {/* Cart button */}
      <Link href="/cart">
        <button className="relative transition-colors rounded-xl p-2 hover:bg-gray-300">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <ShoppingBagIcon className="text-primary-500 w-6 h-6" />
            {mounted && totalItems > 0 && (
              <span className="absolute inset-0 flex items-center justify-center mt-2 text-[9px] font-bold text-primary-500 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </button>
      </Link>

      {/* Favorites button */}
      <button className="transition-colors rounded-xl p-2 hover:bg-gray-300">
        <HeartIcon className="text-primary-500 w-6 h-6 " />
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
                <UserCircleIcon className="text-primary-500 w-6 h-6" />
              )}
              <span className="hidden text-primary-500 sm:inline">
                {session.user.name.split(" ")[0]}
              </span>
            </button>

            <div className="absolute right-0  w-40 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
              <ul className="flex flex-col text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/profile">Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/orders">Orders</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link
            href="/account"
            className="transition-colors hover:text-accent-400 flex items-center gap-2"
          >
            <UserCircleIcon className="text-primary-500 w-6 h-6" />
            <span>Guest area</span>
          </Link>
        )}
      </div>
    </div>
  );
}
