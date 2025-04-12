"use client";

import {
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
    return (
        <footer className="mt-16 text-sm text-gray-600 text-center py-6 flex flex-col items-center gap-4">
            <div className="flex gap-6 justify-center text-gray-500">
                <a href="mailto:contact@mystore.com" aria-label="Email">
                    <EnvelopeIcon className="h-5 w-5 hover:text-blue-500 transition-colors" />
                </a>
                <a href="tel:+22230572816" aria-label="Téléphone">
                    <PhoneIcon className="h-5 w-5 hover:text-green-500 transition-colors" />
                </a>
                <a href="https://mystore..app" target="_blank" rel="noopener noreferrer" aria-label="Site web">
                    <GlobeAltIcon className="h-5 w-5 hover:text-purple-500 transition-colors" />
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} MyStore — Tous droits réservés</p>
        </footer>
    );
}
