"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Mail, Lock, LogIn, ChevronRight, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

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
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (loginError) throw loginError;

      router.push("/dashboard"); // On redirigera vers un dashboard plus tard
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Identifiants invalides");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5 w-full max-w-sm mx-auto">
      {message && (
        <div className="bg-blue-50/10 text-blue-200 p-4 rounded-2xl text-xs font-medium border border-blue-500/20 backdrop-blur-md">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 text-red-200 p-4 rounded-2xl text-xs font-medium border border-red-500/20 backdrop-blur-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" size={18} />
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 focus:border-white/30 focus:bg-white/10 rounded-2xl outline-none transition-all font-medium text-white placeholder:text-gray-500"
          />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" size={18} />
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 focus:border-white/30 focus:bg-white/10 rounded-2xl outline-none transition-all font-medium text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-black py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2"
      >
        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Se connecter</span>}
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-400 text-sm font-medium">
          Nouveau ici ?{" "}
          <Link href="/inscription" className="text-white font-bold hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </form>
  );
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black font-sans">
      {/* Background Image with Dark Mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
          alt="ICC Background"
          fill
          className="object-cover opacity-40 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center">
        {/* Logo Section */}
        <div className="mb-12 transition-transform hover:scale-105 duration-500">
          <div className="relative w-48 h-16 md:w-64 md:h-20">
            <Image
              src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png"
              alt="ICC Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Vision Intro */}
        <div className="mb-10 space-y-3">
          <h1 className="text-2xl md:text-3xl font-extralight text-white tracking-tight leading-tight">
            Bienvenue dans votre <br />
            <span className="font-bold">Espace Champion</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-medium max-w-xs mx-auto">
            Évangéliser, restaurer et enseigner les principes du Royaume.
          </p>
        </div>

        {/* Login Section */}
        <Suspense fallback={<Loader2 className="animate-spin text-white" />}>
          <LoginForm />
        </Suspense>

        {/* Quick Links Footer */}
        <div className="mt-16 flex items-center space-x-6 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          <Link href="/a-propos" className="hover:text-white transition-colors">Notre Vision</Link>
          <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
          <Link href="/sermons" className="hover:text-white transition-colors">Sermons</Link>
          <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
          <Link href="/dons" className="hover:text-white transition-colors">Faire un don</Link>
        </div>
      </div>
    </main>
  );
}
