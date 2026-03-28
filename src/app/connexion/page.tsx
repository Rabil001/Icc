import React from "react";
import Link from "next/link";
import AuthWrapper from "@/components/AuthWrapper";
import { Mail, Lock, LogIn, ChevronRight } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthWrapper
      title="Content de vous revoir"
      subtitle="Connectez-vous pour accéder à vos messages favoris et événements"
    >
      <form className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-bold text-gray-700">Mot de passe</label>
            <Link href="#" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
              Oublié ?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
        >
          <LogIn size={20} />
          <span>Se connecter</span>
        </button>

        {/* Signup Link */}
        <div className="text-center mt-8">
          <p className="text-gray-500 font-medium">
            Pas encore membre ?{" "}
            <Link
              href="/inscription"
              className="text-primary font-bold hover:underline inline-flex items-center"
            >
              Créer un profil <ChevronRight size={16} />
            </Link>
          </p>
        </div>
      </form>
    </AuthWrapper>
  );
}
