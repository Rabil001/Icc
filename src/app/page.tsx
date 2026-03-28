"use client";

import React, { useEffect, useState } from "react";
import { Play, Calendar, Heart, ArrowRight, User as UserIcon, LogOut, Settings } from "lucide-react";
import Link from "next/link";
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
                <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-primary/10">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-3">
                    <Play size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Continuer</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-secondary/10">
                  <div className="w-12 h-12 bg-amber-50 text-secondary rounded-2xl flex items-center justify-center mb-3">
                    <Calendar size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Mes Événements</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-red-100">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-3">
                    <Heart size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Dons</span>
                </button>
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
        /* --- HERO SECTION POUR LES VISITEURS --- */
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0 opacity-60">
            <div className="w-full h-full bg-gradient-to-br from-primary-dark to-slate-800 flex items-center justify-center text-white/10 text-[10vw] font-bold select-none rotate-12">
              IMPACT CENTRE CHRÉTIEN
            </div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <span className="bg-secondary text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-lg shadow-secondary/20">
              Bienvenue à la maison
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              Bâtir des vies <br />
              <span className="text-secondary italic">pour la gloire</span> de Dieu
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-12 font-medium leading-relaxed">
              Découvrez une communauté dynamique où chaque membre est une famille.
              Vivez l'impact et la transformation avec nous.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Link href="/inscription" className="bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-primary/30 active:scale-95">
                <span>Nous Rejoindre</span>
                <ArrowRight size={22} />
              </Link>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center space-x-3 active:scale-95">
                <Play size={22} className="fill-current" />
                <span>Dernier Message</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </section>
      )}

      {/* --- SECTIONS COMMUNES (Visible par tous ou ajustée) --- */}

      {/* Quick Access (Seulement pour les visiteurs ou sous une autre forme) */}
      {!user && (
        <section className="py-20 bg-surface-alt">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-20">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group active:scale-[0.98] border border-gray-50">
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                  <Play size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 tracking-tight">Nos Sermons</h3>
                <p className="text-gray-500 mb-8 leading-relaxed font-medium">Accédez à tous nos messages inspirants en audio et vidéo, où que vous soyez.</p>
                <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                  Explorer <ArrowRight size={20} className="ml-2" />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group active:scale-[0.98] border border-gray-50">
                <div className="w-16 h-16 bg-amber-50 text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-all duration-500 -rotate-3 group-hover:rotate-0">
                  <Calendar size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 tracking-tight">Événements</h3>
                <p className="text-gray-500 mb-8 leading-relaxed font-medium">Restez informé de toutes les activités et cultes spéciaux de l'église.</p>
                <div className="flex items-center text-secondary font-bold group-hover:translate-x-2 transition-transform">
                  Voir le calendrier <ArrowRight size={20} className="ml-2" />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group active:scale-[0.98] border border-gray-50">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 rotate-6 group-hover:rotate-0">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 tracking-tight">Faire un Don</h3>
                <p className="text-gray-500 mb-8 leading-relaxed font-medium">Soutenez la mission de l'église localement et partout dans le monde.</p>
                <div className="flex items-center text-red-500 font-bold group-hover:translate-x-2 transition-transform">
                  Contribuer <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Actualités / Vision (Toujours pertinent) */}
      <section className={user ? "py-12 bg-white" : "py-24 bg-white"}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 aspect-square md:aspect-video bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center text-gray-400 relative group shadow-inner">
               <span className="relative z-10 font-bold uppercase tracking-widest text-sm">[ Vidéo de Vision ]</span>
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900 leading-tight tracking-tighter">
                Vivre la Foi au <br /> <span className="text-primary underline decoration-secondary/30">Quotidien</span> avec ICC
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
                Notre mission est de bâtir une génération de champions, conscients de leur identité en Christ et prêts à impacter positivement la société.
                <br /><br />
                Rejoindre ICC, c'est intégrer une famille qui vous soutient dans votre marche spirituelle et vos projets de vie.
              </p>
              <button className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95">
                Découvrir nos ministères
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimaliste pour l'instant */}
      <footer className="py-12 border-t border-gray-100 bg-surface-alt">
        <div className="container mx-auto px-6 text-center text-gray-400 font-medium">
          <p>© 2024 Impact Centre Chrétien. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
