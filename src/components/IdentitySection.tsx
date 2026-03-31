"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function IdentitySection() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-[40rem] flex flex-col overflow-hidden items-center justify-center bg-black w-full gap-4 mx-auto px-8 relative z-20"
    >
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
          Impact Centre <br /> Chrétien
        </h2>
        <p className="text-lg md:text-2xl text-white/80 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
          Plus qu'une église, une famille dédiée à la restauration des vies et à l'éveil des champions. Notre mission est d'évangéliser, de restaurer et d'enseigner les principes du Royaume.
        </p>

        <Link href="/a-propos" className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-gray-100 transition-all shadow-md active:scale-95">
          <span>En savoir plus</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [229, 84, 252], // La couleur #e554fc d'origine
                [59, 130, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Radial gradient for the cute fade */}
      <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
    </section>
  );
}
