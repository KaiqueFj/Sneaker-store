"use client";

import Link from "next/link";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useSneaker } from "../../../context/SneakerContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignOutButton from "../../login/SignOutButton";
import SearchBar from "./SearchBar";
import { useEffect, useRef, useState } from "react";

export default function OtherOptions() {
  const { state } = useSneaker();
  const { data: session } = useSession();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const modalRef = useRef(null);

  // Close the mobile menu if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

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

      <div className="hidden md:block md:relative group">
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

            {/* Dropdown */}
            <div
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                      transition-opacity duration-200"
            >
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

      {/* Mobile menu */}
      <div className="relative md:hidden">
        {/* Toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 rounded-md text-gray-700 hover:bg-gray-200 z-50 relative ${
            mobileMenuOpen ? "hidden" : "block"
          }`}
        >
          {mobileMenuOpen === false ? (
            <Bars3Icon className="h-6 w-6 text-primary-600" />
          ) : null}
        </button>

        {/* Sliding menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-2/4 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
      ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-end border-b-2 border-primary-600 ">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-200"
            >
              <XMarkIcon className="h-6 w-6 text-primary-600" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 px-4 py-4">
            {session?.user ? (
              <>
                <div className="flex items-left flex-row">
                  <UserCircleIcon className="text-primary-600 w-6 h-6 inline mr-0.5" />
                  <span className="flex text-primary-600 sm:inline">
                    Hello, {session.user?.name?.split(" ")[0] ?? "User"}
                  </span>
                </div>

                <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                  Account
                </Link>
                <Link href="/orders" onClick={() => setMobileMenuOpen(false)}>
                  Orders
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                Guest area
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
