"use client";

import React, { useState } from "react";
import { Play, Search, Filter, Calendar, User, ArrowRight, Share2 } from "lucide-react";

// Données de test pour visualiser le rendu "Moderne & Dynamique"
const SERMONS_DATA = [
  {
    id: 1,
    title: "Vaincre ses peurs par la foi",
    speaker: "Pasteur Yvan Castanou",
    date: "24 Mars 2024",
    category: "Croissance Spirituelle",
    duration: "45:20",
    thumbnail: "bg-blue-600",
  },
  {
    id: 2,
    title: "L'impact de la louange",
    speaker: "Pasteur Yves Castanou",
    date: "17 Mars 2024",
    category: "Adoration",
    duration: "38:15",
    thumbnail: "bg-amber-500",
  },
  {
    id: 3,
    title: "Bâtir sur le roc",
    speaker: "Invité Spécial",
    date: "10 Mars 2024",
    category: "Fondements",
    duration: "52:10",
    thumbnail: "bg-slate-700",
  },
  {
    id: 4,
    title: "Le secret de la paix intérieure",
    speaker: "Pasteur Yvan Castanou",
    date: "03 Mars 2024",
    category: "Bien-être",
    duration: "41:05",
    thumbnail: "bg-emerald-600",
  },
];

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Header de la page */}
      <section className="bg-primary pt-24 pb-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Bibliothèque de <span className="text-secondary italic">Sermons</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium mb-10">
            Retrouvez tous les messages inspirants pour nourrir votre foi au quotidien.
          </p>

          {/* Barre de recherche moderne */}
          <div className="relative max-w-xl mx-auto group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
            <input
              type="text"
              placeholder="Rechercher un message, un pasteur..."
              className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl shadow-2xl outline-none text-gray-800 font-medium placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filtres & Contenu */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          {/* Quick Filters Mobile */}
          <div className="flex items-center space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
            <button className="bg-primary text-white px-6 py-2 rounded-full font-bold whitespace-nowrap">Tout voir</button>
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold whitespace-nowrap hover:bg-gray-200">Plus récents</button>
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold whitespace-nowrap hover:bg-gray-200">Par thèmes</button>
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold whitespace-nowrap">
              <Filter size={18} />
              <span>Filtres</span>
            </button>
          </div>

          {/* Grid de Vidéos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERMONS_DATA.map((sermon) => (
              <div key={sermon.id} className="group cursor-pointer">
                {/* Thumbnail Container */}
                <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-5 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className={`absolute inset-0 ${sermon.thumbnail} opacity-80 group-hover:scale-110 transition-transform duration-700`}></div>

                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Play size={32} className="text-primary fill-current ml-1" />
                    </div>
                  </div>

                  {/* Badge Durée */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold">
                    {sermon.duration}
                  </div>

                  {/* Badge Catégorie */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest">
                    {sermon.category}
                  </div>
                </div>

                {/* Infos du Sermon */}
                <div className="px-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-3 tracking-tight">
                    {sermon.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 font-medium">
                    <div className="flex items-center">
                      <User size={14} className="mr-1.5 text-secondary" />
                      {sermon.speaker}
                    </div>
                    <div className="flex items-center border-l border-gray-200 pl-4">
                      <Calendar size={14} className="mr-1.5" />
                      {sermon.date}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <button className="flex items-center text-primary font-bold text-sm hover:gap-2 transition-all">
                      Regarder maintenant <ArrowRight size={16} className="ml-1" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination ou Bouton de chargement */}
          <div className="mt-20 text-center">
            <button className="bg-surface-alt border-2 border-gray-100 text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-sm">
              Charger plus de messages
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter / Notifications */}
      <section className="py-20 bg-slate-50 mt-10 rounded-t-[3rem]">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-primary-dark p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <h2 className="text-3xl font-bold mb-4 relative z-10">Ne manquez aucun message</h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto relative z-10">Recevez une notification sur votre mobile dès qu'un nouveau sermon est disponible.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 outline-none focus:bg-white focus:text-gray-900 transition-all"
              />
              <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
