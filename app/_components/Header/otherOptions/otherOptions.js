"use client";

import Link from "next/link";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useSneaker } from "../../../context/SneakerContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SearchBar from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import NavigationList from "../nav/NavigationList";

export default function OtherOptions() {
  const { state } = useSneaker();
  const { data: session } = useSession();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const modalRef = useRef(null);

  const navOptionsDesk = [
    {
      label: "Account",
      href: "/account",
      icon: <UserCircleIcon className="text-primary-600 w-6 h-6" />,
    },
    {
      label: "Orders",
      href: "/orders",
      icon: <ShoppingBagIcon className="text-primary-600 w-6 h-6" />,
    },
    { label: "Sign out" },
  ];

  const navOptionsMob = [
    { label: "Sale", href: "/sneakers/nav/sales" },
    { label: "Releases", href: "/" },
    { label: "Men", href: "/sneakers/nav/men" },
    { label: "Women", href: "/sneakers/nav/women" },
  ];

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <div className="flex items-center  justify-end gap-2 text-md">
      <div className="hidden md:flex">
        <SearchBar />
      </div>
      <Cart totalItems={totalItems} />
      <FavoritesBtn />
      <UserMenu session={session} navOptions={navOptionsDesk} />
      <MobileMenu
        session={session}
        navOptions={navOptionsMob}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        modalRef={modalRef}
      />
    </div>
  );
}

/* ------------------- Subcomponents ------------------- */

function Cart({ totalItems }) {
  return (
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
  );
}

function FavoritesBtn() {
  return (
    <button className="transition-colors rounded-xl p-2 hover:bg-gray-300">
      <HeartIcon className="text-primary-600 w-6 h-6" />
    </button>
  );
}

function UserMenu({ session, navOptions }) {
  return (
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

          <div
            className="absolute right-0 w-40 bg-white border border-gray-200 rounded-xl shadow-lg 
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                       transition-opacity duration-200"
          >
            <NavigationList navItems={navOptions} className="flex-col" />
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
  );
}

function MobileMenu({
  session,
  navOptions,
  setMobileMenuOpen,
  mobileMenuOpen,
  modalRef,
}) {
  return (
    <div className="relative md:hidden" ref={modalRef}>
      {/* Open button */}
      {!mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="transition-colors rounded-xl p-2 hover:bg-gray-300"
        >
          <Bars3Icon className="h-6 w-6 text-primary-600" />
        </button>
      )}

      {/* Sliding menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-2/4 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end border-b-2 border-primary-600/20 ">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="transition-colors rounded-xl p-2 hover:bg-gray-300"
          >
            <XMarkIcon className="h-6 w-6 text-primary-600" />
          </button>
        </div>

        <div className="flex flex-col space-y-4 px-4 py-4">
          {session?.user ? (
            <>
              <div className="flex items-start flex-row">
                <UserCircleIcon className="text-primary-600 w-6 h-6 mr-1" />
                <span className="flex text-primary-600">
                  Hello, {session.user?.name?.split(" ")[0] ?? "User"}
                </span>
              </div>
              <NavigationList navItems={navOptions} className="flex-col" />
            </>
          ) : (
            <>
              <Link
                href="/account"
                className="transition-colors w-fit text-sm hover:text-primary-50 bg-primary-600 hover:bg-primary-600/40 text-primary-50 rounded-xl px-4 py-2.5 flex items-center  duration-300"
              >
                Log in
              </Link>
              <NavigationList
                navItems={navOptions}
                className="flex-col gap-4"
                classNameLi="text-2xl "
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
