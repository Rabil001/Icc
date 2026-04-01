"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Mettre à jour le profil (Nom complet)
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // 3. Envoyer l'email de vérification (Firebase standard)
      await sendEmailVerification(user);

      // 4. Enregistrer les infos additionnelles dans Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        createdAt: new Date().toISOString()
      });

      // Rediriger vers l'accueil avec un message
      router.push("/?message=Inscription réussie ! Vérifiez votre boîte mail pour valider votre compte.");

    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Cet email est déjà utilisé");
      } else {
        setError(err.message || "Une erreur est survenue lors de l'inscription");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-y-auto bg-black font-sans pt-8 pb-12 px-6">
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <Image
          src="https://impactcentrechretien.com/wp-content/uploads/2024/01/404443524_729211509231327_6606326441194199131_n.jpeg"
          alt="ICC Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <Link href="/" className="self-start mb-4 p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>

        <div className="mb-6">
          <div className="relative w-48 h-12 md:w-56 md:h-14">
            <Image src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png" alt="ICC Logo" fill className="object-contain" />
          </div>
        </div>

        <div className="mb-10 text-center space-y-2">
          <h1 className="text-3xl font-extralight text-white tracking-tight leading-tight">
            Devenir un <br />
            <span className="font-black uppercase tracking-tighter text-4xl md:text-5xl">Champion</span>
          </h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-5 w-full">
          {error && (
            <div className="bg-red-500/20 text-red-100 p-5 rounded-full text-xs font-medium border border-red-500/30 backdrop-blur-sm animate-in fade-in zoom-in duration-300 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input name="lastName" type="text" required value={formData.lastName} onChange={handleInputChange} placeholder="Nom" className="w-full px-8 py-5 bg-white/10 border border-white/10 focus:border-white/50 focus:bg-white/20 rounded-full outline-none transition-all font-semibold text-white placeholder:text-white/40 backdrop-blur-sm shadow-inner text-base" />
              <input name="firstName" type="text" required value={formData.firstName} onChange={handleInputChange} placeholder="Prénom" className="w-full px-8 py-5 bg-white/10 border border-white/10 focus:border-white/50 focus:bg-white/20 rounded-full outline-none transition-all font-semibold text-white placeholder:text-white/40 backdrop-blur-sm shadow-inner text-base" />
            </div>

            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={20} />
              <input name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full pl-14 pr-8 py-5 bg-white/10 border border-white/10 focus:border-white/50 focus:bg-white/20 rounded-full outline-none transition-all font-semibold text-white placeholder:text-white/40 backdrop-blur-sm shadow-inner text-base" />
            </div>

            <div className="relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={20} />
              <input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} placeholder="Téléphone" className="w-full pl-14 pr-8 py-5 bg-white/10 border border-white/10 focus:border-white/50 focus:bg-white/20 rounded-full outline-none transition-all font-semibold text-white placeholder:text-white/40 backdrop-blur-sm shadow-inner text-base" />
            </div>

            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={20} />
              <input name="password" type={showPassword ? "text" : "password"} required minLength={8} value={formData.password} onChange={handleInputChange} placeholder="Mot de passe" className="w-full pl-14 pr-14 py-5 bg-white/10 border border-white/10 focus:border-white/50 focus:bg-white/20 rounded-full outline-none transition-all font-semibold text-white placeholder:text-white/40 backdrop-blur-sm shadow-inner text-base" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>

            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={20} />
              <input name="confirmPassword" type={showPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirmer mot de passe" className="w-full pl-14 pr-8 py-5 bg-white/10 border border-white/10 focus:border-white/50 focus:bg-white/20 rounded-full outline-none transition-all font-semibold text-white placeholder:text-white/40 backdrop-blur-sm shadow-inner text-base" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-white text-black py-5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2 shadow-2xl mt-4">
            {isLoading ? <Loader2 className="animate-spin" size={22} /> : <span>S'inscrire</span>}
          </button>

          <div className="text-center pt-8 pb-12">
            <p className="text-white/60 text-sm font-medium">Déjà membre ? <Link href="/" className="text-white font-bold hover:underline ml-1">Se connecter</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
}
