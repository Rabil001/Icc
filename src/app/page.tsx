"use client";

import React, { useEffect, useState } from "react";
import { Play, Calendar, Heart, ArrowRight, User as UserIcon, LogOut, Settings, MapPin, Clock, Star, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { IdentitySection } from "@/components/IdentitySection";
import { ChurchVideo } from "@/components/ChurchVideo";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (e) {
        // Silencieux
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="flex flex-col w-full animate-fade-in font-manrope">
      {/* SECTION DYNAMIQUE : HERO VISITEUR VS DASHBOARD MEMBRE */}
      {user ? (
        /* --- DASHBOARD POUR L'UTILISATEUR CONNECTÉ --- */
        <section className="bg-white pt-48 pb-12">
          <div className="container mx-auto px-6">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
                    Heureux de vous revoir, <span className="text-primary">{user.user_metadata.full_name || "Frère/Sœur"}</span> !
                  </h1>
                  <p className="text-gray-500 font-medium text-lg">
                    Prêt pour votre croissance spirituelle aujourd'hui ?
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/profil" className="p-3 bg-white text-gray-600 rounded-2xl shadow-sm hover:text-primary transition-colors">
                    <Settings size={24} />
                  </Link>
                  <button onClick={handleLogout} className="p-3 bg-white text-red-500 rounded-2xl shadow-sm hover:bg-red-50 transition-colors">
                    <LogOut size={24} />
                  </button>
                </div>
              </div>

              {/* Accès Rapides Membres */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                <Link href="/sermons" className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-primary/10">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-3">
                    <Play size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Continuer</span>
                </Link>
                <Link href="/evenements" className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-secondary/10">
                  <div className="w-12 h-12 bg-amber-50 text-secondary rounded-2xl flex items-center justify-center mb-3">
                    <Calendar size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Mes Événements</span>
                </Link>
                <Link href="/dons" className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-red-100">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-3">
                    <Heart size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Dons</span>
                </Link>
                <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-green-100">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-3">
                    <UserIcon size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Mon Groupe</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* --- EXPERIENCE POUR LES VISITEURS --- */
        <>
          {/* Hero Section */}
          <section className="relative h-[90vh] w-full flex flex-col items-center overflow-visible">
             <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
                  alt="ICC Hero Background"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10"></div>
              </div>

              {/* H1 : Very Low, near the bottom edge */}
              <div className="container mx-auto px-5 relative z-30 text-center flex flex-col h-full justify-end pb-32 md:pb-40">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-[28px] md:text-4xl lg:text-5xl font-light text-white leading-[1.2] tracking-wider drop-shadow-xl font-manrope opacity-90">
                    Évangéliser, restaurer et <br className="hidden md:block" /> enseigner les principes du Royaume
                  </h1>
                </div>
              </div>
          </section>

          {/* ChurchVideo outside Hero with negative margin to peek in */}
          <div className="relative z-50 -mt-20 md:-mt-28 mb-32 md:mb-40">
            <ChurchVideo />
          </div>

          {/* SECTION IDENTITÉ AVEC EFFET CANVAS REVEAL */}
          <IdentitySection />

          {/* Section: Prochain Culte */}
          <section className="py-20 bg-white relative z-20">
            <div className="container mx-auto px-6">
              <div className="bg-slate-900 rounded-[3.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl text-white overflow-hidden relative border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>

                <div className="max-w-xl relative z-10 text-center lg:text-left">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase">Vivre l'expérience <span className="text-secondary italic">ICC</span> ce dimanche</h2>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
                    Rejoignez-nous en personne pour un moment de louange vibrante et une parole qui transforme.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center lg:items-start justify-center lg:justify-start space-x-4">
                      <div className="w-12 h-12 bg-white/10 text-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Clock size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold uppercase text-xs tracking-widest text-white">Horaires des Cultes</h4>
                        <p className="text-gray-400 text-sm">09h00 (Gloire) & 11h30 (Impact)</p>
                      </div>
                    </div>
                    <div className="flex items-center lg:items-start justify-center lg:justify-start space-x-4">
                      <div className="w-12 h-12 bg-white/10 text-primary-light rounded-2xl flex items-center justify-center flex-shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold uppercase text-xs tracking-widest text-white">Adresse Locale</h4>
                        <p className="text-gray-400 text-sm">Consultez notre localisateur de campus.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/3 aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden relative group z-10 shadow-2xl">
                   <Image
                    src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
                    alt="Itinéraire"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-white text-slate-900 px-6 py-3 rounded-full font-black shadow-2xl scale-90 group-hover:scale-100 transition-transform uppercase tracking-widest text-[10px]">Voir l'itinéraire</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Nos 3 Piliers */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-16 tracking-tighter uppercase leading-none">Pourquoi nous <span className="text-secondary italic">rejoindre</span> ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-10 rounded-[3.5rem] bg-slate-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-500 group shadow-sm hover:shadow-xl">
                  <div className="w-20 h-20 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Users size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Une Famille</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    À ICC, personne n'est un étranger. Vous intégrez une communauté qui vous aime et vous soutient.
                  </p>
                </div>
                <div className="p-10 rounded-[3.5rem] bg-slate-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-500 group shadow-sm hover:shadow-xl">
                  <div className="w-20 h-20 bg-amber-50 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                    <Star size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Une Vision</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Nous croyons au potentiel illimité que Dieu a placé en vous. Nous vous aidons à l'activer.
                  </p>
                </div>
                <div className="p-10 rounded-[3.5rem] bg-slate-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-500 group shadow-sm hover:shadow-xl">
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                    <ShieldCheck size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Un Impact</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Chaque vie transformée devient une lumière. Ensemble, nous bâtissons un monde meilleur.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- SECTIONS COMMUNES --- */}

      {!user && (
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4 md:mb-0 uppercase">Explorez nos ressources</h2>
              <Link href="/sermons" className="text-secondary font-bold flex items-center hover:translate-x-2 transition-transform">
                Toutes les ressources <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3.5rem] hover:bg-white/10 transition-all group">
                <Play size={32} className="text-secondary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3 uppercase">Sermons Vidéo</h3>
                <p className="text-gray-400 font-medium mb-6">Regardez nos messages inspirants où que vous soyez.</p>
                <Link href="/sermons" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Écouter</Link>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3.5rem] hover:bg-white/10 transition-all group">
                <Calendar size={32} className="text-primary-light mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3 uppercase">Agenda</h3>
                <p className="text-gray-400 font-medium mb-6">Ne manquez aucun de nos événements spéciaux.</p>
                <Link href="/evenements" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Voir</Link>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3.5rem] hover:bg-white/10 transition-all group">
                <Heart size={32} className="text-red-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3 uppercase">Dons</h3>
                <p className="text-gray-400 font-medium mb-6">Soutenez nos actions sociales et missionnaires.</p>
                <Link href="/dons" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Contribuer</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="relative w-12 h-12">
                <Image
                  src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png"
                  alt="ICC Logo"
                  fill
                  className="object-contain"
                />
              </div>
            <p className="text-gray-400 font-medium text-center uppercase tracking-[0.2em] text-[10px]">© 2024 Impact Centre Chrétien. Bâtir des champions.</p>
            <div className="flex space-x-6 text-gray-400 font-bold text-sm uppercase tracking-widest text-[10px]">
              <Link href="#" className="hover:text-primary transition-colors">Facebook</Link>
              <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-primary transition-colors">YouTube</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
