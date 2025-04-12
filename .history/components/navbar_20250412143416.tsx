"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CubeIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkStyle = "flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
          Mystore
        </Link>


        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium">
          <Link href="/" className={navLinkStyle}>
            <HomeIcon className="h-5 w-5" /> Accueil
          </Link>
          <Link href="/products" className={navLinkStyle}>
            <CubeIcon className="h-5 w-5" /> Produits
          </Link>
          <Link href="/checkout" className={navLinkStyle}>
            <CreditCardIcon className="h-5 w-5" /> Checkout
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative text-gray-700 hover:text-indigo-600 transition-colors">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md animate-slide-down">
          <ul className="flex flex-col p-4 space-y-3 text-base font-medium">
            <li>
              <Link href="/" className={navLinkStyle}>
                <HomeIcon className="h-5 w-5" /> Accueil
              </Link>
            </li>
            <li>
              <Link href="/products" className={navLinkStyle}>
                <CubeIcon className="h-5 w-5" /> Produits
              </Link>
            </li>
            <li>
              <Link href="/checkout" className={navLinkStyle}>
                <CreditCardIcon className="h-5 w-5" /> Checkout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
