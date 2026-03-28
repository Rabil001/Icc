import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-surface-alt">
      <div className="container mx-auto px-6 py-12 flex-grow flex flex-col items-center justify-center">
        {/* Back to Home Mobile */}
        <Link
          href="/"
          className="self-start mb-8 flex items-center text-gray-500 hover:text-primary transition-colors md:hidden"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Retour</span>
        </Link>

        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
               <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              {title}
            </h1>
            <p className="text-gray-500 font-medium">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm max-w-xs leading-relaxed">
          En vous connectant, vous rejoignez une communauté engagée à transformer des vies par la foi.
        </p>
      </div>
    </div>
  );
}
