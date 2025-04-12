"use client";

import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-16 text-sm text-gray-600 text-center py-6 flex flex-col items-center gap-4">
            <div className="flex gap-4 text-xl text-gray-500">
                <a href="#" aria-label="Instagram">
                    <FaInstagram className="hover:text-pink-500 transition-colors" />
                </a>
                <a href="#" aria-label="Twitter">
                    <FaTwitter className="hover:text-blue-500 transition-colors" />
                </a>
                <a href="#" aria-label="Facebook">
                    <FaFacebook className="hover:text-blue-700 transition-colors" />
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} MyStore — Tous droits réservés</p>
        </footer>
    );
}
