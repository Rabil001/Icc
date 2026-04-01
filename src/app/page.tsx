"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Calendar, Heart, Play, ChevronRight, User as UserIcon } from "lucide-react";
import { IdentitySection } from "@/components/IdentitySection";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/profil");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white font-sans overflow-hidden pb-24 pt-32">
      {/* 1. APP HEADER / WELCOME SECTION */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-12 animate-fade-in">
        {user ? (
          <div className="flex items-center space-x-5 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-xl">
              <UserIcon size={28} className="text-white" />
            </div>
            <div>
              <p className="text-white/50 text-sm font-bold tracking-widest uppercase mb-1">Bienvenue,</p>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {user.displayName?.split(' ')[0] || "Champion"}
              </h1>
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
              L'ÉGLISE <br className="hidden md:block"/>QUI <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">TRANSFORME</span>
            </h1>
            <p className="text-white/60 font-medium max-w-md text-lg leading-relaxed">
              Application officielle de l'Impact Centre Chrétien. Écoutez, participez et grandissez avec nous.
            </p>
          </div>
        )}
      </section>

      {/* 2. APP WIDGETS GRID */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/sermons" className="group bg-[#111111] hover:bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 transition-all flex flex-col active:scale-95 relative overflow-hidden shadow-2xl">
            <div className="w-12 h-12 bg-primary/20 text-primary-light rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/10">
              <Play size={24} className="fill-current" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Messages</h3>
            <p className="text-white/50 text-sm font-medium pr-4 mb-8">Écoutez les derniers enseignements et bâtissez votre foi.</p>
            <div className="mt-auto flex justify-between items-center text-primary-light font-bold text-xs uppercase tracking-widest">
              <span>Écouter</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                 <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/evenements" className="group bg-[#111111] hover:bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 transition-all flex flex-col active:scale-95 relative overflow-hidden shadow-2xl">
            <div className="w-12 h-12 bg-secondary/20 text-secondary-light rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-secondary/10">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Agenda</h3>
            <p className="text-white/50 text-sm font-medium pr-4 mb-8">Retrouvez les événements, rassemblements et vos réunions.</p>
            <div className="mt-auto flex justify-between items-center text-secondary-light font-bold text-xs uppercase tracking-widest">
              <span>Découvrir</span>
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                 <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/dons" className="group bg-[#111111] hover:bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 transition-all flex flex-col active:scale-95 relative overflow-hidden shadow-2xl">
            <div className="w-12 h-12 bg-red-400/20 text-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/10">
              <Heart size={24} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Dîmes & Offrandes</h3>
            <p className="text-white/50 text-sm font-medium pr-4 mb-8">Soutenez fidèlement l'œuvre de Dieu en toute sécurité.</p>
            <div className="mt-auto flex justify-between items-center text-red-400 font-bold text-xs uppercase tracking-widest">
              <span>Contribuer</span>
              <div className="w-8 h-8 rounded-full bg-red-400/10 flex items-center justify-center group-hover:bg-red-400/20 transition-colors">
                 <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. APP GUEST CALL TO ACTION */}
      {!user && (
         <section className="px-6 md:px-12 max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center shadow-2xl">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                 <UserIcon size={24} className="text-white/80" />
               </div>
               <h2 className="text-3xl font-black text-white mb-4">Rejoignez la Famille</h2>
               <p className="text-white/50 max-w-md mb-10 font-medium text-sm md:text-base leading-relaxed">
                 Créez votre profil pour accéder à votre espace membre, rejoindre une cellule virtuelle et conserver vos messages favoris.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                 <Link href="/inscription" className="bg-white text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center">
                    Créer mon profil
                 </Link>
                 <Link href="/connexion" className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95 flex items-center justify-center">
                    Se connecter
                 </Link>
               </div>
            </div>
         </section>
      )}

      {/* 4. IDENTITY SECTION (Kept for church vision scale, but fits the dark theme perfectly) */}
      <IdentitySection />
    </main>
  );
}
