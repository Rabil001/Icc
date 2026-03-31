"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Sermons", href: "/sermons" },
    { name: "Événements", href: "/evenements" },
    { name: "Dons", href: "/dons" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Original */}
        <Link href="/" className="relative hover:scale-105 active:scale-95 transition-transform">
          <div className="relative w-16 h-16">
            <Image
              src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png"
              alt="ICC Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-bold text-white/90 hover:text-white text-sm uppercase tracking-[0.2em] transition-colors drop-shadow-sm"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href={user ? "/profil" : "/connexion"}
            className="flex items-center space-x-2 bg-white text-primary px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl active:scale-95"
          >
            <User size={18} />
            <span>{user ? "Mon Compte" : "Connexion"}</span>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white transition-colors"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 transition-transform duration-500 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-8 border-b border-white/10">
           <div className="relative w-12 h-12">
              <Image
                src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png"
                alt="ICC Logo"
                fill
                className="object-contain"
              />
           </div>
           <button onClick={() => setIsOpen(false)} className="text-white">
              <X size={36} />
           </button>
        </div>
        <nav className="flex flex-col p-10 space-y-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black text-white flex items-center justify-between group"
            >
              <span className="uppercase tracking-tighter">{link.name}</span>
              <ArrowRight size={32} className="text-secondary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
            </Link>
          ))}
          <div className="pt-10 border-t border-white/10 mt-auto">
            <Link
              href={user ? "/profil" : "/connexion"}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-3 bg-secondary text-white p-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-secondary/20 uppercase tracking-widest"
            >
              <User size={28} />
              <span>{user ? "Mon Espace" : "Se connecter"}</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
