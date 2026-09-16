'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function CampaignSection() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link href="/campaigns" className="block w-full">
      <section 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-screen bg-black text-white flex flex-col justify-between px-6 md:px-12 py-10 select-none overflow-hidden cursor-none"
      >
        
        {/* Full Screen Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
          >
            <source src="/campaign-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />
        </div>

        {/* Custom Floating Cursor [ SEE CAMPAIGN ] - Fixed size, no shrinking */}
        {isHovered && (
          <div 
            className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center px-5 py-2.5 bg-white/90 backdrop-blur-md text-black font-mono-custom text-xs uppercase tracking-[0.25em] font-bold shadow-2xl rounded-full whitespace-nowrap"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          >
            [ SEE CAMPAIGN ]
          </div>
        )}

        {/* Top Bar: Campaign info / numbering - Unchanged */}
        <div className="relative z-10 flex justify-between items-start w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-red-500 font-mono-custom text-xs tracking-widest">
              <span className="font-bold text-sm">03</span>
              <span className="w-8 h-[1px] bg-red-500/60"></span>
            </div>
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-neutral-400">
              [ DROP // 2026 ]
            </span>
          </div>

          <div className="text-right">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.25em] text-neutral-300 max-w-xs">
              RAW STREETWEAR ENERGY REDEFINED FOR THE UNDERGROUND.
            </p>
          </div>
        </div>

        {/* ================= DESKTOP VIEW ONLY (100% Original & Untouched) ================= */}
        <div className="hidden md:flex relative z-10 max-w-7xl w-full mx-auto justify-between items-end pb-4">
          <div className="space-y-2 pt-32">
            <h2 className="font-thunder text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.85] font-extrabold text-white drop-shadow-md">
              New<br />(Clothes)
            </h2>
            <div className="font-serif italic text-base text-neutral-300 tracking-wide font-light pt-2">
              Same Streets. <br /> Different Perspective.
            </div>
          </div>

          <div className="flex flex-col items-end space-y-4">
            <div className="flex items-center gap-4 text-neutral-400 font-mono-custom text-[10px] uppercase tracking-widest">
              <span>WATCH THE DROP</span>
              <span className="w-12 h-[1px] bg-neutral-500"></span>
            </div>
            <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center text-white font-mono-custom text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-lg">
              <span>PLAY</span>
            </div>
          </div>
        </div>


        {/* ================= MOBILE VIEW ONLY: Positioned right above footer line with Curtain Reveal Animation ================= */}
        <div className="md:hidden relative z-10 w-full flex justify-between items-end pb-2">
          
          {/* Left: Text with Curtain Reveal Animation */}
          <div className="overflow-hidden">
            <div className={`space-y-1 transition-transform duration-1000 ease-out ${
              isVisible ? 'translate-y-0' : 'translate-y-full'
            }`}>
              <h2 className="font-thunder text-3xl sm:text-4xl uppercase tracking-tighter leading-[0.85] font-extrabold text-white drop-shadow-md">
                New<br />(Clothes)
              </h2>
              <div className="font-serif italic text-xs text-neutral-300 tracking-wide font-light">
                Same Streets. Different Perspective.
              </div>
            </div>
          </div>

          {/* Right: Play Button */}
          <div className="pb-1">
            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white font-mono-custom text-[10px] uppercase tracking-widest shadow-lg">
              <span>PLAY</span>
            </div>
          </div>

        </div>


        {/* Bottom Footer Info Line - Unchanged */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-neutral-300 flex justify-between items-center font-mono-custom text-[10px] uppercase tracking-widest text-neutral-500">
          <span>EST. 2023</span>
          <span>URBAN OUTFITS</span>
          <span>BUILT FOR THE STREETS</span>
        </div>

      </section>
    </Link>
  );
}