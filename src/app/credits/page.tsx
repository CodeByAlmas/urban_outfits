'use client';

import React from 'react';
import Link from 'next/link';

const creditSections = [
  {
    id: "01",
    role: "BRAND & CREATIVE DIRECTION",
    entity: "URBN STUDIO & ALMAS STUDIO",
    desc: "Crafting the visual identity, brutalist typography, and raw Gen Z aesthetic for modern Indian streetwear."
  },
  {
    id: "02",
    role: "FRONTEND ARCHITECTURE & UI",
    entity: "NEXT.JS (APP ROUTER) & TAILWIND CSS",
    desc: "Built for lightning-fast performance, zero-layout-shift responsiveness, and robust local storage persistence."
  },
  {
    id: "03",
    role: "AI MOTION & CINEMATIC VISTA",
    entity: "GOOGLE VEO & FLOW PIPELINE",
    desc: "Powering high-fps stylized animations, pre-production storyboards, and immersive digital lookbooks."
  },
  {
    id: "04",
    role: "INVENTORY & ADMIN SECURITY",
    entity: "SECURE SESSION AUTH & RECOVERY PIN",
    desc: "Robust store management protocols featuring dynamic pricing, live stock toggles, and multi-image flexibility."
  }
];

export default function CreditsPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom pt-28 pb-16 px-4 sm:px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto border-b border-black/20 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#ED3833] font-bold">[ ACKNOWLEDGEMENTS ]</span>
        <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider mt-2 break-words">
          CREDITS & BUILDERS.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-2 leading-relaxed">
          The minds, frameworks, and creative pipelines that brought URBN to life.
        </p>
      </div>

      {/* Credits Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {creditSections.map((item) => (
          <div key={item.id} className="border border-black/20 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-black transition-colors">
            <div>
              <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ {item.id} ] {item.role}</span>
              <h3 className="font-thunder text-2xl uppercase font-bold mt-2 break-words">
                {item.entity}
              </h3>
              <p className="text-xs text-neutral-600 uppercase tracking-wider mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/10 flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest">
              <span>URBN 2026</span>
              <span>[ VERIFIED ]</span>
            </div>
          </div>
        ))}
      </div>

      {/* Callout Footer Box */}
      <div className="max-w-4xl mx-auto border border-black bg-black text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ COLLABORATE ]</span>
          <div className="font-thunder text-2xl uppercase tracking-wider mt-1">WANT TO BUILD SOMETHING LOUD?</div>
        </div>
        <Link 
          href="/contact"
          className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#ED3833] hover:text-white transition-colors cursor-pointer"
        >
          GET IN TOUCH →
        </Link>
      </div>

      {/* Mobile-Only Bottom Spacer to prevent footer overlap */}
      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />
    </main>
  );
}