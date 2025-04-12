"use client";

export default function Footer() {
    return (
        <footer className="mt-16 text-sm text-black text-center py-6">
            <p>
                &copy; {new Date().getFullYear()} MonEntreprise — Tous droits réservés
            </p>
        </footer>
    );
}
