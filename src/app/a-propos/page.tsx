"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Target, Eye, Users, Heart, Star, ShieldCheck, Quote } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header de la page */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image
            src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
            alt="ICC Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Retour à l'accueil</span>
          </Link>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter font-boldonse uppercase">
            Notre <span className="text-secondary italic">Histoire</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
            Découvrez la vision, la mission et les cœurs passionnés qui bâtissent la famille Impact Centre Chrétien.
          </p>
        </div>
      </section>

      {/* Section Vision & Mission Détaillée */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
                  <Image
                    src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
                    alt="ICC Worship"
                    fill
                    className="object-cover"
                  />
               </div>
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-primary">
                   <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Target size={28} />
                   </div>
                   <h2 className="text-3xl font-black font-boldonse uppercase tracking-tight">Notre Mission</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  Impact Centre Chrétien a pour mission d'évangéliser, de restaurer et d'enseigner les principes du Royaume de Dieu afin de transformer chaque personne en un champion pour Christ.
                  <br /><br />
                  Nous croyons que chaque individu possède un potentiel divin qui ne demande qu'à être activé pour impacter positivement la société.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-secondary">
                   <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                      <Eye size={28} />
                   </div>
                   <h2 className="text-3xl font-black font-boldonse uppercase tracking-tight">Notre Vision</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  Bâtir une génération de champions, conscients de leur identité en Christ et prêts à influencer toutes les sphères de la société par les valeurs du Royaume de Dieu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Citation / Punchline */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <Quote size={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5" />
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black font-boldonse uppercase tracking-tighter leading-tight max-w-4xl mx-auto">
              "À ICC, nous ne formons pas seulement des membres, <span className="text-secondary italic">nous bâtissons des familles</span> et nous équipons des leaders."
            </h2>
         </div>
      </section>

      {/* Section Leaders (Placeholder) */}
      <section className="py-24 bg-surface-alt">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-boldonse uppercase tracking-tighter">Nos <span className="text-primary">Leaders</span></h2>
            <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
              Des hommes et des femmes passionnés, dévoués à servir la vision et à accompagner chaque membre dans sa croissance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[3/4] bg-gray-200 relative">
                   {/* Placeholder Image */}
                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-black uppercase tracking-widest text-xs">
                      [ Photo Leader ]
                   </div>
                </div>
                <div className="p-10 text-center border-t border-gray-50">
                  <h3 className="text-2xl font-black text-gray-900 font-boldonse uppercase mb-2">Leader Nom</h3>
                  <p className="text-primary font-bold uppercase tracking-widest text-xs mb-6">Titre / Responsabilité</p>
                  <div className="flex justify-center space-x-4">
                     <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                        <Users size={18} />
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="py-20 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-6 text-center">
           <Link href="/inscription" className="bg-primary text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-primary-dark transition-all shadow-2xl shadow-primary/30 inline-block mb-12">
              Nous rejoindre dès maintenant
           </Link>
           <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">© 2024 Impact Centre Chrétien. Bâtir des champions.</p>
        </div>
      </footer>
    </div>
  );
}
