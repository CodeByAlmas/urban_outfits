'use client';

import React from 'react';
import Link from 'next/link';

const openPositions = [
  { id: "01", title: "SENIOR STREETWEAR DESIGNER", location: "NEW DELHI / REMOTE", type: "FULL-TIME" },
  { id: "02", title: "CREATIVE MOTION EDITOR (VEO / 3D)", location: "MUMBAI / REMOTE", type: "CONTRACT" },
  { id: "03", title: "ECOMMERCE FRONTEND DEVELOPER", location: "REMOTE", type: "FULL-TIME" },
  { id: "04", title: "STUDIO INTERN & LOGISTICS", location: "NEW DELHI", type: "INTERNSHIP" },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom pt-28 pb-12 px-4 sm:px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto border-b border-black/20 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#ED3833] font-bold">[ 02. COMPANY / CAREERS ]</span>
        <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mt-2 break-words">
          JOIN THE MOVEMENT.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-2 max-w-xl leading-relaxed">
          We are always looking for relentless creators, builders, and visionaries who want to redefine Indian streetwear culture.
        </p>
      </div>

      {/* Grid Layout for Openings (Fully Responsive) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {openPositions.map((pos) => (
          <div key={pos.id} className="border border-black/20 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-black transition-colors group shadow-xs">
            <div>
              <div className="flex justify-between items-center text-[10px] tracking-widest text-neutral-500 mb-4">
                <span>[ {pos.id} ]</span>
                <span className="border border-black/20 px-2 py-0.5">{pos.type}</span>
              </div>
              <h3 className="font-thunder text-2xl sm:text-3xl font-bold uppercase tracking-wider group-hover:text-[#ED3833] transition-colors break-words">
                {pos.title}
              </h3>
              <p className="text-xs text-neutral-600 uppercase tracking-wider mt-2">
                LOCATION: {pos.location}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <span className="text-[11px] uppercase tracking-widest font-bold">URBN STUDIO</span>
              <a 
                href={`mailto:careers@urbn.studio?subject=Application for position: ${encodeURIComponent(pos.title)}`}
                className="w-full sm:w-auto text-center text-xs uppercase tracking-widest font-bold bg-black text-white px-4 py-2.5 hover:bg-[#ED3833] hover:scale-[1.02] transition-all cursor-pointer shadow-sm"
              >
                APPLY NOW →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Spacer to prevent footer overlap on mobile */}
      <div className="w-full h-44 sm:h-56 pointer-events-none" aria-hidden="true" />
    </main>
  );
}