"use client";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Colonne 1 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">À propos</h3>
                        <p className="text-sm text-gray-400">
                            Nous vous offrons des produits de qualité au meilleur prix. Votre satisfaction est notre priorité.
                        </p>
                    </div>

                    {/* Colonne 2 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Navigation</h3>
                        <ul className="text-sm space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Accueil</a></li>
                            <li><a href="#" className="hover:text-white transition">Produits</a></li>
                            <li><a href="#" className="hover:text-white transition">À propos</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Colonne 3 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="#" className="hover:text-gray-400 transition">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="hover:text-gray-400 transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="hover:text-gray-400 transition">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="hover:text-gray-400 transition">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} MonEntreprise. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
