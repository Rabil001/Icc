"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, User, Menu, Globe } from "lucide-react";
import { cn } from "@/utils/cn";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sermons", href: "/sermons" },
    { name: "Événements", href: "/evenements" },
    { name: "Dons", href: "/dons" },
    { name: "À propos", href: "/a-propos" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#fdf24d] py-2 px-4 text-center text-[11px] font-bold text-black uppercase tracking-wider z-[60] relative">
        Rejoignez-nous ce dimanche à 09h00 et 11h30 <span className="ml-2 inline-block">↓</span>
      </div>

      <header className="fixed top-12 left-0 right-0 z-50 px-4 md:px-8">
        <div className={cn(
          "container mx-auto max-w-7xl bg-white/90 backdrop-blur-md rounded-full py-3 px-6 md:px-8 flex justify-between items-center shadow-lg transition-all duration-300",
          scrolled ? "py-2 bg-white" : ""
        )}>
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 transition-transform hover:scale-105">
              <Image
                src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png"
                alt="ICC Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[13px] font-semibold text-gray-700 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden md:flex items-center space-x-4 text-gray-700">
               <Link href="/connexion" className="flex items-center space-x-1 text-[13px] font-semibold hover:text-black">
                 <User size={18} />
                 <span>{user ? "Mon compte" : "Connexion"}</span>
               </Link>
               <div className="h-4 w-[1px] bg-gray-200"></div>
               <button className="flex items-center space-x-1 text-[13px] font-semibold hover:text-black">
                 <Globe size={18} />
                 <span className="uppercase text-[10px]">FR</span>
               </button>
            </div>

            <Link
              href="/direct"
              className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-800 transition-all active:scale-95 whitespace-nowrap"
            >
              Suivre le direct
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-black"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay (Simplifié) */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-[70] p-8 flex flex-col animate-in fade-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-12">
               <div className="relative w-12 h-12">
                  <Image src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png" alt="ICC" fill className="object-contain" />
               </div>
               <button onClick={() => setIsOpen(false)}><X size={32} /></button>
            </div>
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-3xl font-black uppercase tracking-tighter">{link.name}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
