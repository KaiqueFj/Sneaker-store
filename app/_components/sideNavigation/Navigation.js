"use client";

import Link from "next/link";

function AccountMenu() {
  return (
    // Menu container
    <div className="px-4 py-6 w-11/12 sm:w-11/12 md:w-2/4 grid  h-fit  grid-cols-1 sm:grid-cols-1 gap-7 place-self-center rounded-md bg-gray-100/50">
      {/* Orders */}
      <div className="flex flex-col h-fit gap-2 w-full items-start">
        <h2 className="text-lg text-primary-600 font-normal">Orders</h2>
        <ul className="text-sm p-4 bg-primary-50 rounded-md w-full text-primary-600 font-normal">
          <li className="font-normal text-primary-600/50 hover:text-primary-600 transition-colors duration-75">
            <Link href="/account/orders">Last orders</Link>
          </li>
        </ul>
      </div>

      {/* Account management */}
      <div className="flex flex-col h-fit gap-2 w-full items-start">
        <h2 className="text-lg text-primary-600 font-normal">Account</h2>
        <ul className="text-sm p-4 flex flex-col gap-2 bg-primary-50 rounded-md w-full text-primary-600 font-normal">
          <li className="font-normal text-primary-600/50 hover:text-primary-600 transition-colors duration-75">
            <Link href="/account/profile">Update profile</Link>
          </li>
          <li className="font-normal text-primary-600/50 hover:text-primary-600 transition-colors duration-75">
            <Link href="/">Update e-mail</Link>
          </li>
          <li className="font-normal text-primary-600/50 hover:text-primary-600 transition-colors duration-75">
            <Link href="/">Update password</Link>
          </li>
          <li className="font-normal text-primary-600/50 hover:text-primary-600 transition-colors duration-75">
            <Link href="/">Manage Cards</Link>
          </li>
        </ul>
      </div>

      {/* Services */}
      <div className="flex flex-col h-fit gap-2 w-full items-start">
        <h2 className="text-lg text-primary-600 font-normal">Services</h2>
        <ul className="text-sm p-4 bg-primary-50 rounded-md w-full text-primary-600 font-normal">
          <li className="font-normal text-primary-600/50 hover:text-primary-600 transition-colors duration-75">
            <Link href="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AccountMenu;
