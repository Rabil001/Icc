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
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const navLinks = [
    { name: "Sermons", href: "/sermons" },
    { name: "Événements", href: "/evenements" },
    { name: "Dons", href: "/dons" },
    { name: "À propos", href: "/a-propos" },
  ];

  return (
    <>
      {/* --- FIXED ANNOUNCEMENT BAR --- */}
      <div className="fixed top-0 left-0 right-0 w-full bg-[#fdf24d] py-1.5 px-4 text-center text-[11px] font-bold text-black z-[100] shadow-sm">
        Rejoignez-nous ce dimanche à 07h30 et 10h30 <span className="ml-1 inline-block">⌄</span>
      </div>

      {/* --- SCROLLABLE NAVBAR (ABSOLUTE) --- */}
      <header className="absolute top-10 left-0 right-0 z-50 px-4 md:px-8">
        <div className={cn(
          "container mx-auto max-w-7xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full py-2.5 px-5 md:px-8 flex justify-between items-center shadow-2xl transition-all duration-300"
        )}>

          {/* --- MOBILE LAYOUT --- */}
          <div className="flex lg:hidden w-full items-center justify-between">
            {/* Left: Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/90 hover:text-white transition-colors"
            >
              <Menu size={24} strokeWidth={2.5} />
            </button>

            {/* Center: Logo Only (Original Colors) */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
              <div className="relative w-32 h-8">
                <Image
                  src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png"
                  alt="ICC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Right: Globe */}
            <button className="p-2 text-white/90 hover:text-white transition-colors">
              <Globe size={24} strokeWidth={2} />
            </button>
          </div>

          {/* --- DESKTOP LAYOUT --- */}
          {/* Logo Only (Desktop - Original Colors) */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link href="/" className="relative flex items-center group">
               <div className="relative w-28 h-10 transition-transform group-hover:scale-105">
                <Image
                  src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png"
                  alt="ICC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[13px] font-bold text-white/70 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/connexion" className="flex items-center space-x-2 text-[13px] font-bold text-white/80 hover:text-white transition-colors">
              <User size={18} />
              <span>{user ? "Mon Compte" : "Connexion"}</span>
            </Link>

            <Link
              href="/inscription"
              className="bg-white text-black px-7 py-2.5 rounded-full font-black text-[13px] hover:bg-gray-100 transition-all active:scale-95 whitespace-nowrap shadow-xl uppercase tracking-widest"
            >
              S'inscrire
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[110] p-10 flex flex-col animate-in fade-in slide-in-from-top duration-500">
            <div className="flex justify-between items-center mb-16">
               <div className="relative w-32 h-10">
                  <Image src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png" alt="ICC" fill className="object-contain" />
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white"><X size={36} /></button>
            </div>
            <nav className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-4xl font-black text-white uppercase tracking-tighter hover:text-secondary transition-colors">{link.name}</Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col space-y-4">
               <Link href="/inscription" onClick={() => setIsOpen(false)} className="bg-white text-black py-5 rounded-2xl text-center font-black uppercase tracking-widest">S'inscrire</Link>
               <Link href="/connexion" onClick={() => setIsOpen(false)} className="border border-white/20 text-white py-5 rounded-2xl text-center font-bold uppercase tracking-widest">Connexion</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
