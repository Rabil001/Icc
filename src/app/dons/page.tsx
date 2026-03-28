"use client";

import React, { useState } from "react";
import { Heart, CreditCard, Smartphone, Banknote, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import AuthWrapper from "@/components/AuthWrapper";

const AMOUNTS = [10, 20, 50, 100, 250, 500];

export default function DonationPage() {
  const [amount, setAmount] = useState<number | string>(50);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "bank">("mobile");
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen bg-surface-alt pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-2xl">
        {/* Header de la page */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] mb-6 shadow-sm">
            <Heart size={40} className="fill-current" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Soutenir la Mission</h1>
          <p className="text-gray-500 font-medium text-lg leading-relaxed">
            Votre générosité permet de transformer des vies et de propager l'Évangile localement et dans le monde entier.
          </p>
        </div>

        {/* Formulaire de Don */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">

            {step === 1 ? (
              <div className="space-y-10 animate-fade-in">
                {/* Choix du Montant */}
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Montant du don</label>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                          amount === amt
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {amt}€
                      </button>
                    ))}
                  </div>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">€</span>
                    <input
                      type="number"
                      placeholder="Autre montant"
                      className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-xl text-gray-800"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Moyen de Paiement */}
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Moyen de paiement</label>
                  <div className="space-y-3">
                    <button
                      onClick={() => setPaymentMethod("mobile")}
                      className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all ${
                        paymentMethod === "mobile" ? "border-primary bg-blue-50/50" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mr-4">
                        <Smartphone size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">Mobile Money</p>
                        <p className="text-xs text-gray-500 font-medium">Orange, MTN, Wave...</p>
                      </div>
                      {paymentMethod === "mobile" && <CheckCircle2 className="ml-auto text-primary" size={24} />}
                    </button>

                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all ${
                        paymentMethod === "card" ? "border-primary bg-blue-50/50" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className="w-12 h-12 bg-blue-100 text-primary rounded-xl flex items-center justify-center mr-4">
                        <CreditCard size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">Carte Bancaire</p>
                        <p className="text-xs text-gray-500 font-medium">Visa, Mastercard...</p>
                      </div>
                      {paymentMethod === "card" && <CheckCircle2 className="ml-auto text-primary" size={24} />}
                    </button>

                    <button
                      onClick={() => setPaymentMethod("bank")}
                      className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all ${
                        paymentMethod === "bank" ? "border-primary bg-blue-50/50" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mr-4">
                        <Banknote size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">Virement Bancaire</p>
                        <p className="text-xs text-gray-500 font-medium">RIB de l'église</p>
                      </div>
                      {paymentMethod === "bank" && <CheckCircle2 className="ml-auto text-primary" size={24} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 transition-all active:scale-[0.98]"
                >
                  <span>Continuer</span>
                  <ArrowRight size={22} />
                </button>
              </div>
            ) : (
              <div className="animate-fade-in text-center space-y-8">
                {/* Détails du Paiement (Simulé) */}
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-gray-500 font-bold text-sm uppercase mb-2">Récapitulatif</p>
                  <p className="text-4xl font-black text-primary">{amount} €</p>
                  <p className="text-gray-400 text-sm mt-2">Via {paymentMethod === "mobile" ? "Mobile Money" : paymentMethod === "card" ? "Carte Bancaire" : "Virement"}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600 font-medium">
                    Vous allez être redirigé vers notre passerelle de paiement sécurisée pour finaliser votre don.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-600 font-bold bg-green-50 py-3 rounded-xl">
                    <ShieldCheck size={20} />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                   <button
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl shadow-xl active:scale-[0.98]"
                    onClick={() => alert("Redirection vers la passerelle...")}
                  >
                    Confirmer le don
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-gray-400 font-bold py-2 hover:text-gray-600"
                  >
                    Modifier le montant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer d'information */}
        <div className="mt-12 text-center text-gray-400 text-sm font-medium leading-relaxed">
          <p>
            Impact Centre Chrétien est une association cultuelle.<br />
            Vos dons ouvrent droit à une réduction d'impôt (selon votre pays de résidence).
          </p>
        </div>
      </div>
    </div>
  );
}
