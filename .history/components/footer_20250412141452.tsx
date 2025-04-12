<div className="bg-gray-900 text-white py-8 mt-8">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Colonne 1: Infos de l'entreprise */}
            <div>
                <h3 className="text-xl font-semibold mb-4">À propos</h3>
                <p className="text-sm">
                    Nous sommes une entreprise dédiée à fournir des produits de qualité à des prix abordables. Votre satisfaction est notre priorité !
                </p>
            </div>

            {/* Colonne 2: Liens de navigation */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Navigation</h3>
                <ul className="text-sm space-y-2">
                    <li><a href="#" className="hover:text-gray-400">Accueil</a></li>
                    <li><a href="#" className="hover:text-gray-400">Nos produits</a></li>
                    <li><a href="#" className="hover:text-gray-400">À propos</a></li>
                    <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                </ul>
            </div>

            {/* Colonne 3: Réseaux sociaux */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
                <div className="flex justify-center gap-4">
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 mt-8 pt-4">
            <p className="text-center text-sm">
                &copy; 2025 MonEntreprise. Tous droits réservés.
            </p>
        </div>
    </div>
</div>
