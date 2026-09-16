'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const modelImages = [
  "/hero-model.png",
  "/hero-model-2.png",
  "/hero-model-3.png",
  "/hero-model-4.png"
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collectionText, setCollectionText] = useState("[ SEE COLLECTION ]");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % modelImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100vh] flex flex-col justify-between px-6 md:px-12 pt-28 pb-6 overflow-hidden select-none bg-[#FFF9F7]">
      
      {/* Background Layer: Sliding Model Images */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center">

        {/* Sliding Model Images Layer */}
        <div className="absolute inset-0 w-full h-full z-10 overflow-hidden">
          {modelImages.map((imgSrc, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + modelImages.length) % modelImages.length;

            return (
              <img
                key={imgSrc}
                src={imgSrc}
                alt={`Urban Outfitz Hero Model ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover opacity-95 transition-transform duration-1000 ease-in-out ${
                  isActive 
                    ? 'translate-y-0 z-20 scale-100' 
                    : isPrev 
                    ? '-translate-y-full z-10 scale-100' 
                    : 'translate-y-full z-0 scale-100'
                }`}
              />
            );
          })}
        </div>

      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 items-center justify-between relative z-20 my-auto py-6">
        
        {/* Left Column: Heading & Subtitle (Hidden on mobile as requested, fully visible on desktop) */}
        <div className="hidden md:flex md:col-span-5 flex-col items-start text-left space-y-3">
          <p className="font-mono-custom text-[11px] uppercase tracking-widest text-neutral-500">
            STREETWEAR FOR REAL LIFE
          </p>
          
          <h1 className="font-thunder text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.85] font-extrabold text-black">
            URBAN<br />OUTFITS
          </h1>

          <div className="flex items-center gap-3 pt-1">
            <span className="w-5 h-[1.5px] bg-black"></span>
            <p className="font-mono-custom text-[11px] uppercase tracking-wider text-neutral-500 leading-tight">
              SAME STREETS.<br />DIFFERENT PERSPECTIVE.
            </p>
          </div>

          <div className="pt-3">
            <Link 
              href="/collections" 
              className="inline-flex items-center gap-3 group font-mono-custom text-xs uppercase tracking-widest text-black hover:text-[#ED3833] transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#ED3833] transition-colors text-xs">
                &rarr;
              </span>
              <span className="underline underline-offset-4">EXPLORE COLLECTION</span>
            </Link>
          </div>
        </div>

        {/* Center Space for Model Image */}
        <div className="md:col-span-2 hidden md:flex flex-col justify-end items-center h-72 relative">
        </div>

        {/* Right Column: Tagline & Counter (Hidden on mobile, fully visible on desktop) */}
        <div className="hidden md:flex md:col-span-5 flex-col items-start md:items-end text-left md:text-right mt-8 md:mt-0 space-y-3">
          <h2 className="font-thunder text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-[0.9] font-bold text-white">
            WHERE<br />STREETWEAR<br />MEETS<br />ATTITUDE
          </h2>

          <p className="font-mono-custom text-[11px] uppercase tracking-widest text-neutral-500 text-white leading-tight">
            MORE THAN CLOTHES.<br />IT'S A MINDSET.
          </p>

          <div className="flex items-center gap-3 pt-3 font-mono-custom text-xs tracking-widest text-white">
            <span>0{currentIndex + 1} / 0{modelImages.length}</span>
            <div className="flex gap-1">
              {modelImages.map((_, i) => (
                <span 
                  key={i} 
                  className={`h-[2px] transition-all duration-500 ${i === currentIndex ? 'w-5 bg-white' : 'w-2.5 bg-neutral-300'}`}
                ></span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* See Collection Button (Visible on both mobile & desktop) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <Link 
          href="/collections" 
          onMouseEnter={() => setCollectionText("[ SEE COLLECTIONNN ]")}
          onMouseLeave={() => setCollectionText("[ SEE COLLECTION ]")}
          className="px-4 py-1.5 bg-black text-white font-mono-custom text-[10px] uppercase tracking-widest rounded-full hover:bg-[#ED3833] transition-colors shadow-md whitespace-nowrap overflow-hidden inline-block"
        >
          <span className="invisible block h-0">[ SEE COLLECTIONN ]</span>
          <span>{collectionText}</span>
        </Link>
      </div>

    </section>
  );
}