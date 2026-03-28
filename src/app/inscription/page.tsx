"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthWrapper from "@/components/AuthWrapper";
import { User, Mail, Lock, UserPlus, ChevronRight, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Inscription avec Supabase Auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (signupError) throw signupError;

      if (data.user) {
        // Redirection vers une page de succès ou l'accueil
        router.push("/connexion?message=Vérifiez votre email pour confirmer l'inscription");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper
      title="Bienvenue chez ICC"
      subtitle="Rejoignez notre famille et participez activement à la vie de l'église"
    >
      <form onSubmit={handleSignup} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 animate-pulse">
            {error}
          </div>
        )}

        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Nom complet</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Ex: Jean Martin"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Choisir un mot de passe</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              name="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Minimum 8 caractères"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            <>
              <UserPlus size={20} />
              <span>S'inscrire</span>
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-500 font-medium">
            Déjà membre ?{" "}
            <Link
              href="/connexion"
              className="text-primary font-bold hover:underline inline-flex items-center"
            >
              Se connecter <ChevronRight size={16} />
            </Link>
          </p>
        </div>
      </form>
    </AuthWrapper>
  );
}
