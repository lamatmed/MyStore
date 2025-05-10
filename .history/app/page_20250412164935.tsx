
'use client';

import { FaStore, FaLightbulb, FaBullhorn, FaGlobe, FaHammer, FaHandshake, FaMagic, FaEnvelope, FaFacebook, FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';

export default function HomePage() {
  const menuItems = [
    { icon: <FaStore />, label: 'Boutique' },
    { icon: <FaLightbulb />, label: 'Nos Créations' },
    { icon: <FaBullhorn />, label: 'Promotion' },
    { icon: <FaGlobe />, label: 'Vente en Gros' },
    { icon: <FaHammer />, label: 'Fabrication sur Commande' },
    { icon: <FaHandshake />, label: 'Partenariat' },
    { icon: <FaMagic />, label: 'Caverne d’Ali Baba' },
    { icon: <FaEnvelope />, label: 'Contact' },
  ];

  const socialIcons = [
    <FaFacebook key="fb" />,
    <FaWhatsapp key="wa" />,
    <FaTiktok key="tt" />,
    <FaInstagram key="ig" />,
  ];

  return (
    <div className="p-6 max-w-md mx-auto">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 text-lg text-brown-700">
            <span className="text-2xl text-orange-700">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4 mt-8 text-2xl text-orange-700">
        {socialIcons.map((icon) => icon)}
      </div>
    </div>
  );
}