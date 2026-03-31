"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

export function ChurchVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect when the video container is in view to trigger autoplay
  const isInView = useInView(containerRef, {
    margin: "-20% 0px -20% 0px",
    once: false
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center start"],
  });

  // Animation: Scale to exactly 1, with 8px safety padding
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const width = useTransform(scrollYProgress, [0, 0.5], ["92%", "calc(100% - 16px)"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["40px", "20px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    if (isInView && !isPlaying) {
      setIsPlaying(true);
    }
  }, [isInView, isPlaying]);

  return (
    <div ref={containerRef} className="w-full relative z-50 flex justify-center py-10 px-[8px]">
      <motion.div
        style={{
          scale,
          borderRadius,
          opacity,
          width
        }}
        className="relative aspect-video overflow-hidden shadow-2xl bg-black border border-white/5"
      >
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div
              key="thumbnail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src="https://impactcentrechretien.com/wp-content/uploads/2023/09/IMG_0342-scaled.jpg"
                alt="ICC Experience"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              {/*
                  Back to standard aspect-video (16:9) and scale 1.0
                  to show the full image and standard YouTube UI.
              */}
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/9K796Yl2WYE?autoplay=1&mute=1&controls=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
