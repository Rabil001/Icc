"use client";

import React, { useEffect, useState } from "react";
import { Play, Calendar, Heart, ArrowRight, User as UserIcon, LogOut, Settings, MapPin, Clock, Star, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* SECTION DYNAMIQUE : HERO VISITEUR VS DASHBOARD MEMBRE */}
      {user ? (
        /* --- DASHBOARD POUR L'UTILISATEUR CONNECTÉ --- */
        <section className="bg-white pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="bg-surface-alt rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
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
          {/* Hero Section - Image Seule sans aucun élément interactif */}
          <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
             {/* Image de fond avec Overlay subtil */}
             <div className="absolute inset-0 z-0">
                <Image
                  src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
                  alt="ICC Hero Background"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
              </div>
          </section>

          {/* Section: Prochain Culte */}
          <section className="py-20 bg-white relative z-20">
            <div className="container mx-auto px-6">
              <div className="bg-surface-alt rounded-[3rem] p-8 md:p-16 border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Vivre l'expérience <span className="text-primary">ICC</span> ce dimanche</h2>
                  <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10">
                    Nous serions ravis de vous accueillir en personne. Nos cultes sont des moments de joie, de louange vibrante et d'enseignements pratiques.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Horaires des Cultes</h4>
                        <p className="text-gray-500">09h00 (Culte de Gloire) & 11h30 (Culte d'Impact)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Adresse Locale</h4>
                        <p className="text-gray-500">Consultez notre localisateur pour trouver le campus le plus proche.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3 aspect-square bg-slate-200 rounded-[2.5rem] overflow-hidden relative group">
                   <Image
                    src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
                    alt="Itinéraire"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-white/90 backdrop-blur px-8 py-4 rounded-2xl font-black text-primary shadow-2xl scale-90 group-hover:scale-100 transition-transform">Voir l'itinéraire</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Nos 3 Piliers */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-16 tracking-tighter">Pourquoi nous <span className="text-secondary italic">rejoindre</span> ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-10 rounded-[3rem] hover:bg-surface-alt transition-colors duration-500 group">
                  <div className="w-20 h-20 bg-blue-50 text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Users size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Une Famille</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    À ICC, personne n'est un étranger. Vous intégrez une communauté qui vous aime, vous soutient et prie pour vous.
                  </p>
                </div>
                <div className="p-10 rounded-[3rem] hover:bg-surface-alt transition-colors duration-500 group">
                  <div className="w-20 h-20 bg-amber-50 text-secondary rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                    <Star size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Une Vision</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Nous croyons au potentiel illimité que Dieu a placé en vous. Nous vous aidons à le découvrir et à l'activer.
                  </p>
                </div>
                <div className="p-10 rounded-[3rem] hover:bg-surface-alt transition-colors duration-500 group">
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                    <ShieldCheck size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Un Impact</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Chaque vie transformée devient une lumière pour la société. Ensemble, nous bâtissons un monde meilleur.
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
              <h2 className="text-4xl font-black tracking-tight mb-4 md:mb-0">Explorez nos ressources</h2>
              <Link href="/sermons" className="text-secondary font-bold flex items-center hover:translate-x-2 transition-transform">
                Toutes les ressources <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <Play size={32} className="text-secondary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">Sermons Vidéo</h3>
                <p className="text-gray-400 font-medium mb-6">Regardez nos messages inspirants où que vous soyez.</p>
                <Link href="/sermons" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold">Écouter</Link>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <Calendar size={32} className="text-primary-light mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">Agenda</h3>
                <p className="text-gray-400 font-medium mb-6">Ne manquez aucun de nos événements spéciaux.</p>
                <Link href="/evenements" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold">Voir</Link>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <Heart size={32} className="text-red-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">Dons</h3>
                <p className="text-gray-500 font-medium mb-6">Soutenez nos actions sociales et missionnaires.</p>
                <Link href="/dons" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold">Contribuer</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-surface-alt">
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
            <p className="text-gray-400 font-medium text-center">© 2024 Impact Centre Chrétien. Bâtir des champions.</p>
            <div className="flex space-x-6 text-gray-400 font-bold text-sm">
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
