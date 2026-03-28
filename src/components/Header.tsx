"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Bell } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for dynamic header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Sermons", href: "/sermons" },
    { name: "Événements", href: "/evenements" },
    { name: "Dons", href: "/dons" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-effect shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <span className={cn(
            "font-bold text-2xl tracking-tighter",
            scrolled ? "text-primary" : "text-primary"
          )}>
            ICC
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <Link
            href="/connexion"
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary-dark transition-all shadow-md active:scale-95"
          >
            <User size={18} />
            <span>Se connecter</span>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center space-x-4">
           <button className="p-2 text-gray-700">
            <Bell size={22} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-primary transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[70px] bg-white z-40 transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/connexion"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center space-x-2 bg-primary text-white p-4 rounded-xl font-bold text-lg"
          >
            <User size={24} />
            <span>Se connecter</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
