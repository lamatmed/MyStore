"use client";

import Link from "next/link";
import Image from "next/image";
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="mt-16 text-sm text-gray-600 text-center py-6 flex flex-col items-center gap-4">
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={40}
          height={40}
          className="rounded"
        />
        <span className="font-semibold text-base text-gray-800">MyStore</span>
      </Link>

      <div className="flex gap-6 justify-center text-gray-500">
        <a href="mailto:contact@mystore.com" aria-label="Email">
          <EnvelopeIcon className="h-5 w-5 hover:text-blue-500 transition-colors" />
        </a>
        <a href="tel:+33123456789" aria-label="Téléphone">
          <PhoneIcon className="h-5 w-5 hover:text-green-500 transition-colors" />
        </a>
        <a
          href="https://mystore.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Site web"
        >
          <GlobeAltIcon className="h-5 w-5 hover:text-purple-500 transition-colors" />
        </a>
      </div>

      <p className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} MyStore — Tous droits réservés
      </p>
    </footer>
  );
}
