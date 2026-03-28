"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Filter, Users, Stars } from "lucide-react";

const EVENTS_DATA = [
  {
    id: 1,
    title: "Culte Dominical d'Impact",
    description: "Rejoignez-nous pour un moment intense de louange, d'adoration et une parole transformatrice.",
    date: "Dimanche 31 Mars",
    time: "09:00 - 11:30",
    location: "Auditorium Principal",
    category: "Culte",
    image: "bg-primary",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Séminaire : Bâtir son Foyer",
    description: "Un temps d'enseignement pratique pour renforcer les couples et les familles selon les principes bibliques.",
    date: "Samedi 06 Avril",
    time: "14:00 - 18:00",
    location: "Salle des Banquets",
    category: "Séminaire",
    image: "bg-secondary",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Soirée de Prière : IMPACT NIGHT",
    description: "Une nuit dédiée à l'intercession et à la puissance du Saint-Esprit. Venez vivre l'impossible.",
    date: "Vendredi 12 Avril",
    time: "21:00 - 04:00",
    location: "Auditorium Principal",
    category: "Prière",
    image: "bg-slate-900",
    isFeatured: false,
  },
  {
    id: 4,
    title: "Génération ICC : Spécial Jeunesse",
    description: "Un rassemblement dynamique pour la jeunesse consciente de son identité et de sa mission.",
    date: "Mercredi 17 Avril",
    time: "16:00 - 19:00",
    location: "Espace Jeunes",
    category: "Jeunesse",
    image: "bg-blue-500",
    isFeatured: false,
  },
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = ["Tous", "Culte", "Séminaire", "Prière", "Jeunesse"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Événements */}
      <section className="bg-slate-900 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Stars size={14} className="text-secondary" />
            <span>Calendrier de la communauté</span>
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Ne manquez aucun <br /> <span className="text-secondary italic">rendez-vous</span> divin
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Consultez nos prochains cultes, séminaires et événements spéciaux pour rester connecté à la vie de votre église.
          </p>
        </div>
      </section>

      {/* Barre de Filtres */}
      <section className="py-8 bg-surface-alt border-b border-gray-100 sticky top-[64px] z-30 shadow-sm overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all active:scale-95 ${
                  activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Liste des Événements */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {EVENTS_DATA.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Date / Image Box */}
                <div className={`w-full md:w-48 h-48 md:h-auto ${event.image} relative flex flex-col items-center justify-center p-6 text-white text-center`}>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CalendarIcon size={32} className="mb-3 opacity-60" />
                  <p className="text-3xl font-black leading-none mb-1 tracking-tighter">{event.date.split(' ')[1]}</p>
                  <p className="font-bold uppercase tracking-widest text-xs opacity-80">{event.date.split(' ')[2]}</p>

                  {/* Category Badge */}
                  <div className="mt-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-white/30">
                    {event.category}
                  </div>
                </div>

                {/* Content Box */}
                <div className="flex-grow p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-primary font-bold text-xs uppercase tracking-widest mb-3 space-x-3">
                       <span className="flex items-center">
                        <Clock size={14} className="mr-1.5" />
                        {event.time}
                       </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors tracking-tight leading-none">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 font-medium line-clamp-2 leading-relaxed mb-6">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-gray-50 gap-4">
                    <div className="flex items-center text-gray-400 font-bold text-sm italic">
                      <MapPin size={16} className="mr-2 text-secondary" />
                      {event.location}
                    </div>
                    <button className="flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95">
                      <span>S'inscrire</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Invitation Spéciale */}
          <div className="mt-24 bg-surface-alt rounded-[3rem] p-12 text-center border border-gray-100 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <Users size={48} className="mx-auto text-primary mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Vous souhaitez devenir membre ?</h2>
            <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Découvrez nos cultes d'accueil pour les nouveaux arrivants et trouvez votre place dans la famille ICC.
            </p>
            <button className="bg-white border-2 border-primary text-primary px-10 py-4 rounded-2xl font-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm">
              Découvrir nos ministères
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
