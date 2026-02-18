"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-600 text-primary-50 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Brand */}
        <h2 className="text-lg font-bold text-white">Loja Tubarão</h2>

        {/* Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/" className="hover:text-white transition">
            Início
          </Link>
          <Link
            href="/sneakers/nav/sales"
            className="hover:text-white transition"
          >
            Promoções
          </Link>
          <Link href="/about" className="hover:text-white transition">
            Sobre
          </Link>
          <Link href="contact" className="hover:text-white transition">
            Contato
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} Shark store. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
