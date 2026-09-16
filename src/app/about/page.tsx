'use client';

import React from 'react';
import Link from 'next/link';

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-28 pb-16 px-6 md:px-12 select-none overflow-x-hidden relative">
      
      {/* Background Grunge / Collage overlay texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-repeat"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Top Header Label */}
        <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase mb-6 flex items-center gap-3">
          <span>[ WHO WE ARE ]</span>
          <span className="w-12 h-[1px] bg-[#ED3833]"></span>
        </div>

        {/* SECTION 1: Top Hero Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* Left Column: Massive Headline & Subtext */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h1 className="font-thunder text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                MORE<br />
                THAN JUST<br />
                CLOTHES.
              </h1>
              <div className="w-24 h-1.5 bg-[#ED3833] mb-6"></div>
              <p className="font-mono-custom text-xs uppercase tracking-[0.2em] text-neutral-700 leading-relaxed max-w-sm">
                WE BUILD A STATE OF MIND.<br />
                A CULTURE. A COMMUNITY.
              </p>
            </div>

            <div className="w-16 h-[1px] bg-black/30 hidden lg:block"></div>
          </div>

          {/* Center Column: Cutout image made much larger to cover right area */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <img 
              src="/about-hero.png" 
              alt="URBN Hero Cutout" 
              className="w-full max-w-2xl lg:max-w-3xl object-contain drop-shadow-2xl scale-125 transform translate-x-6"
            />
          </div>

          {/* Right Column: Small Quote Text Box (Right image removed & text shifted slightly up) */}
          <div className="lg:col-span-2 flex flex-col justify-center transform -translate-y-6">
            <div className="space-y-2 bg-[#FFF9F7]/90 backdrop-blur-xs p-4 border border-black/15 shadow-sm w-full">
              <div className="font-mono-custom text-[10px] uppercase tracking-widest text-neutral-500">EST. 2023</div>
              <div className="w-6 h-[1px] bg-black"></div>
              <p className="font-mono-custom text-[11px] uppercase tracking-wider text-neutral-800 leading-relaxed font-bold">
                INSPIRED BY REAL PEOPLE. REAL PLACES. REAL STORIES.
              </p>
            </div>
          </div>

        </div>

        {/* SECTION 2: Dark Storytelling Container ("BUILT DIFFERENT") */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black text-white py-14 px-6 md:px-20 mb-20 overflow-hidden shadow-2xl">
          
          <div className="max-w-7xl mx-auto relative">
            <div className="absolute top-0 right-0 font-mono-custom text-xs text-neutral-500 uppercase tracking-widest">
              [ 02 ]
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Image in Dark Box */}
              <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] border border-neutral-800 overflow-hidden group">
                <div className="absolute top-3 left-3 z-20 font-mono-custom text-[10px] text-white bg-black/80 px-2 py-0.5">
                  [ 01 ]
                </div>
                <img 
                  src="/hero-model-2.png" 
                  alt="Built Different" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute bottom-3 left-3 font-serif italic text-white text-sm">
                  DIFFERENT PEOPLE. SAME URBN.
                </div>
              </div>

              {/* Center Story Text */}
              <div className="lg:col-span-4 space-y-6">
                <div className="font-mono-custom text-xs uppercase tracking-[0.3em] text-[#ED3833]">
                  OUR STORY
                </div>
                <h2 className="font-thunder text-5xl sm:text-6xl font-black uppercase tracking-tight leading-none text-white">
                  BUILT<br />DIFFERENT.
                </h2>
                <p className="font-mono-custom text-xs uppercase tracking-wider text-neutral-400 leading-relaxed">
                  URBN STARTED WITH A SIMPLE IDEA — TO CREATE CLOTHES THAT FEEL REAL. NOT TRENDS THAT FADE, BUT PIECES THAT STAY. INSPIRED BY STREET CULTURE, MUSIC, ART AND THE PEOPLE WHO DARE TO BE DIFFERENT.
                </p>
                <div className="pt-2">
                  <span className="font-thunder text-2xl tracking-wider text-white uppercase font-bold">
                    THIS IS <span className="text-[#ED3833]">URBN</span>. A LOUDER YOU.
                  </span>
                </div>
              </div>

              {/* Right Numbered Pillars (01 to 04) */}
              <div className="lg:col-span-3 flex flex-col space-y-6 font-mono-custom text-xs border-l border-neutral-800 pl-6">
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-bold text-[#ED3833]">01</span>
                    <span className="text-[10px] uppercase tracking-widest">REAL PEOPLE</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase">Real stories. Real style.</p>
                  <div className="w-full h-[1px] bg-neutral-800 pt-2"></div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-bold text-[#ED3833]">02</span>
                    <span className="text-[10px] uppercase tracking-widest">TIMELESS DESIGN</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase">Trends fade. Attitude stays.</p>
                  <div className="w-full h-[1px] bg-neutral-800 pt-2"></div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-bold text-[#ED3833]">03</span>
                    <span className="text-[10px] uppercase tracking-widest">CULTURE DRIVEN</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase">Inspired by streets, music & art.</p>
                  <div className="w-full h-[1px] bg-neutral-800 pt-2"></div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-bold text-[#ED3833]">04</span>
                    <span className="text-[10px] uppercase tracking-widest">SUSTAINABLE THINKING</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase">Better choices for a brighter tomorrow.</p>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* SECTION 3: Bottom Mindset & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Title & Manifesto */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-thunder text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              IT’S A<br />MINDSET.
            </h3>
            <div className="w-12 h-[1px] bg-black"></div>
            <p className="font-mono-custom text-[11px] uppercase tracking-wider text-neutral-600 leading-relaxed pt-2">
              FOR THE ONES WHO THINK DIFFERENTLY. DRESS BOLDER. LIVE FREER.
            </p>
            <div className="font-mono-custom text-xs font-bold uppercase tracking-widest pt-4 text-[#ED3833]">
              [ URBN ]
            </div>
          </div>

          {/* Center Banner Image with Catchphrase */}
          <div className="lg:col-span-6 relative h-[300px] sm:h-[360px] bg-neutral-900 border border-black/20 overflow-hidden group">
            <img 
              src="/identity-bg.png" 
              alt="Same Streets Different Perspective" 
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-85"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 right-6 font-thunder text-4xl sm:text-5xl font-black uppercase text-white tracking-wider text-right drop-shadow-lg leading-tight">
              SAME STREETS.<br />
              DIFFERENT PERSPECTIVE.
            </div>
          </div>

          {/* Right Poster / Signage Image Box */}
          <div className="lg:col-span-3 relative h-[300px] sm:h-[360px] bg-neutral-900 border border-black/20 overflow-hidden group">
            <img 
              src="/hero-model-4.png" 
              alt="Good People Better Outfits" 
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute top-3 right-3 font-mono-custom text-[10px] text-white bg-black/70 px-2 py-0.5 tracking-widest">
              [ SS..2025 ]
            </div>
            <div className="absolute bottom-4 left-4 font-mono-custom text-[10px] text-white uppercase tracking-widest leading-snug bg-black/80 p-2">
              CLOTHES<br />PEOPLE<br />PLACES<br />IDEAS
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}