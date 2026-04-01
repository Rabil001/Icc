"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthWrapper from "@/components/AuthWrapper";
import { Mail, Lock, LogIn, ChevronRight, Loader2 } from "lucide-react";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/profil");
      router.refresh();
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") {
        setError("Email ou mot de passe incorrect");
      } else {
        setError(err.message || "Identifiants invalides");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {message && (
        <div className="bg-blue-50 text-blue-600 p-4 rounded-xl text-sm font-medium border border-blue-100">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

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
        <div className="flex justify-between items-center ml-1">
          <label className="text-sm font-bold text-gray-700">Mot de passe</label>
          <Link href="#" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
            Oublié ?
          </Link>
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-70"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={22} />
        ) : (
          <>
            <LogIn size={20} />
            <span>Se connecter</span>
          </>
        )}
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
  );
}

export default function LoginPage() {
  return (
    <AuthWrapper
      title="Content de vous revoir"
      subtitle="Connectez-vous pour accéder à vos messages favoris et événements"
    >
      <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
        <LoginForm />
      </Suspense>
    </AuthWrapper>
  );
}
