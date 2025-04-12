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

  const navLinkStyle =
    "flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:text-primary-foreground transition-colors"
        >
          Mon E-commerce
        </Link>

        {/* Desktop */}
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

        {/* Cart + menu */}
        <div className="flex items-center space-x-4">
          <Link
            href="/checkout"
            className="relative text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white animate-pulse">
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
              <XMarkIcon className="h-6 w-6 text-foreground" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-background shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
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
