"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-600 text-primary-50 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Brand */}
        <h2 className="text-lg font-bold text-white">Shark Store</h2>

        {/* Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/sales" className="hover:text-white transition">
            Sales
          </Link>
          <Link href="#" className="hover:text-white transition">
            About
          </Link>
          <Link href="#" className="hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} Shark Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
