'use client';

import {

  LightBulbIcon,
  MegaphoneIcon,
  GlobeAltIcon,
  WrenchIcon,

  SparklesIcon,
  MailIcon,
  FacebookIcon,
  WhatsAppIcon,
  TiktokIcon,
  InstagramIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const menuItems = [
    { icon: <StorefrontIcon className="h-6 w-6 text-orange-700" />, label: 'Boutique' },
    { icon: <LightBulbIcon className="h-6 w-6 text-orange-700" />, label: 'Nos Créations' },
    { icon: <MegaphoneIcon className="h-6 w-6 text-orange-700" />, label: 'Promotion' },
    { icon: <GlobeAltIcon className="h-6 w-6 text-orange-700" />, label: 'Vente en Gros' },
    { icon: <WrenchIcon className="h-6 w-6 text-orange-700" />, label: 'Fabrication sur Commande' },
    { icon: <HandshakeIcon className="h-6 w-6 text-orange-700" />, label: 'Partenariat' },
    { icon: <SparklesIcon className="h-6 w-6 text-orange-700" />, label: 'Caverne d’Ali Baba' },
    { icon: <MailIcon className="h-6 w-6 text-orange-700" />, label: 'Contact' },
  ];

  const socialIcons = [
    <FacebookIcon key="fb" className="h-6 w-6 text-orange-700" />,
    <WhatsAppIcon key="wa" className="h-6 w-6 text-orange-700" />,
    <TiktokIcon key="tt" className="h-6 w-6 text-orange-700" />,
    <InstagramIcon key="ig" className="h-6 w-6 text-orange-700" />,
  ];

  return (
    <div className="p-6 max-w-md mx-auto">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 text-lg text-brown-700">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4 mt-8 text-2xl text-orange-700">
        {socialIcons}
      </div>
    </div>
  );
}
