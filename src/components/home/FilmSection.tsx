'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FilmSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress track karne ke liye section ki height 300vh rakhi hai
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cutout image ka scale zoom-in (1 se 18 tak)
  const cutoutScale = useTransform(scrollYProgress, [0, 1], [1, 18]);

  // Upar wale elements ke liye upward slide aur fade out
  const topElementsY = useTransform(scrollYProgress, [0, 0.25], [0, -300]);
  const topElementsOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Neeche wale footer elements ke liye downward slide aur fade out
  const bottomElementsY = useTransform(scrollYProgress, [0, 0.4], [0, 200]);
  const bottomElementsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#FFF9F7] text-black select-none">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between px-6 md:px-12 py-8">
        
        {/* Background Video Layer (Hamesha piche rahegi) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover filter brightness-95"
          >
            <source src="/film-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Top Header Section (Upar jayega scroll par) */}
        <motion.div 
          style={{ y: topElementsY, opacity: topElementsOpacity }}
          className="max-w-7xl mx-auto w-full flex justify-between items-start z-20 relative pt-1"
        >
          <div className="flex items-center gap-3 font-mono-custom text-xs tracking-widest">
            <span className="text-red-500 font-bold">06</span>
            <span className="w-8 h-[1px] bg-red-500"></span>
            <span className="text-neutral-900 uppercase font-bold tracking-widest">FILM</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-800 text-sm">
            <span className="p-2 border border-neutral-300 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm">🧺</span>
            <span className="p-2 border border-neutral-300 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm">👔</span>
          </div>
        </motion.div>

        {/* Center Content: Heading (hidden on mobile) & Paragraph (visible on mobile) */}
        <motion.div 
          style={{ y: topElementsY, opacity: topElementsOpacity, pointerEvents: topElementsOpacity as any }}
          className="max-w-4xl mx-auto w-full text-center z-20 flex flex-col items-center relative pt-4"
        >
          <div className="space-y-3 absolute bottom-40">
            <h2 className="font-thunder text-4xl md:text-6xl uppercase tracking-tighter font-extrabold text-black drop-shadow-sm leading-none hidden md:block">
              A VISION IN MOTION.
            </h2>
            <p className="font-mono-custom text-[9px] md:text-[11px] uppercase tracking-wider text-neutral-800 max-w-xl mx-auto leading-relaxed bg-white/40 backdrop-blur-xs px-3 py-1.5">
              EXPERIENCE THE ESSENCE OF URBAN OUTFITS THROUGH FILM. OUR CINEMATIC JOURNEY BRINGS TO LIFE THE BOLD, AUTHENTIC SPIRIT BEHIND EACH COLLECTION. WATCH AS OUR DESIGNS <span className="text-red-600 font-bold">MOVE, INSPIRE</span>, AND TELL STORIES OF INDIVIDUALITY, STRENGTH, AND REBELLION.
            </p>
          </div>
        </motion.div>

        {/* Full Screen Cutout Layer Overlay (Center zoom-in dive effect) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          <motion.div 
            style={{ scale: cutoutScale }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img 
              src="/film-cutout.png" 
              alt="Full Size Film Cutout Mask" 
              className="w-full h-full object-cover md:object-fill pointer-events-none select-none"
            />
          </motion.div>
        </div>

        {/* Left Side Floating Text (Upar jayega) */}
        <motion.div 
          style={{ y: topElementsY, opacity: topElementsOpacity }}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-1 font-mono-custom text-[10px] uppercase tracking-widest text-neutral-700 z-20 pointer-events-none"
        >
          <span>PEOPLE.</span>
          <span>PLACES.</span>
          <span>PERSPECTIVE.</span>
          <span>PROGRESS.</span>
          <span className="w-[1px] h-12 bg-neutral-400 mt-3"></span>
        </motion.div>

        {/* Right Side Floating Text (Upar jayega) */}
        <motion.div 
          style={{ y: topElementsY, opacity: topElementsOpacity }}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end space-y-1 font-mono-custom text-[10px] uppercase tracking-widest text-neutral-700 z-20 pointer-events-none"
        >
          <span>MORE</span>
          <span>THAN</span>
          <span>JUST</span>
          <span>CLOTHES.</span>
          <span className="w-[1px] h-12 bg-neutral-400 mt-3"></span>
        </motion.div>

        {/* Bottom Footer Info (Neeche ki taraf slide hoke disappear hoga) */}
        <motion.div 
          style={{ y: bottomElementsY, opacity: bottomElementsOpacity }}
          className="max-w-7xl mx-auto w-full flex justify-between items-end z-20 relative font-mono-custom text-[10px] uppercase tracking-widest text-neutral-700 pb-1"
        >
          <div>
            FILM SHAPES<br />BIGGER STORIES.
          </div>
          <div className="flex flex-col items-center">
            <span>SCROLL TO DIVE</span>
            <span className="w-[1px] h-6 bg-neutral-500 mt-1"></span>
          </div>
          <div className="text-right">
            URBAN OUTFITS<br />EST. 2023
          </div>
        </motion.div>

      </div>
    </section>
  );
}