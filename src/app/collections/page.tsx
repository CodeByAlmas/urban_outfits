'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Collections Data matching reference layout (01 to 08)
const collectionsData = [
  {
    id: "01",
    title: "TOPS",
    subtitle: "TEES / SHIRTS / HOODIES",
    image: "/hero-model-2.png",
    slug: "/shop/tops"
  },
  {
    id: "02",
    title: "BOTTOMS",
    subtitle: "PANTS / DENIM / CARGOS",
    image: "/hero-model-3.png",
    slug: "/shop/bottoms"
  },
  {
    id: "03",
    title: "OUTERWEAR",
    subtitle: "JACKETS / COATS / BOMBERS",
    image: "/hero-model-4.png",
    slug: "/shop/outerwear"
  },
  {
    id: "04",
    title: "SETS",
    subtitle: "CO-ORDS / TRACKSUITS / SETS",
    image: "/identity-character.png",
    slug: "/shop/sets"
  },
  {
    id: "05",
    title: "ACCESSORIES",
    subtitle: "CAPS / BAGS / JEWELRY / BELTS",
    image: "/hero-model.png",
    slug: "/shop/accessories"
  },
  {
    id: "06",
    title: "FOOTWEAR",
    subtitle: "SNEAKERS / BOOTS / SLIDES",
    image: "/hero-model-3.png",
    slug: "/shop/footwear"
  },
  {
    id: "07",
    title: "LIMITED EDITION",
    subtitle: "EXCLUSIVE DROPS / SPECIALS",
    image: "/hero-model-2.png",
    slug: "/shop/limited-edition"
  },
  {
    id: "08",
    title: "SALE",
    subtitle: "LAST PIECES / BEST DEALS",
    image: "/hero-model-4.png",
    slug: "/shop/sale"
  },
];

export default function CollectionsPage() {
  const [activeCard, setActiveCard] = useState("01");

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-28 pb-16 px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Top Header Section Tag */}
      <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase mb-4">
        [ COLLECTIONS ]
      </div>

      {/* Title & Subtitle Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/20 pb-8 mb-10 gap-6">
        <div>
          {/* Font size reduced to prevent massive stretching */}
          <h1 className="font-thunder text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-3">
            NEW ORDER
          </h1>
          <div className="flex items-center gap-4 font-mono-custom text-xs uppercase tracking-[0.2em] text-neutral-700">
            <span>DIFFERENT PEOPLE. SAME URBN.</span>
            <span className="w-12 h-[1px] bg-black/40 hidden sm:block"></span>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono-custom text-xs uppercase tracking-widest text-neutral-600">
          <span className="border border-black/20 px-3 py-1.5 bg-black text-white font-bold">[ 08 ITEMS ]</span>
          <span className="border border-black/20 px-3 py-1.5">[ UA ]</span>
        </div>
      </div>

      {/* 8-Column Grid / Vertical Cards Layout (Fixed text overlap with proper spacing & text constraints) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-16">
        {collectionsData.map((item) => (
          <Link 
            key={item.id}
            href={item.slug}
            onMouseEnter={() => setActiveCard(item.id)}
            className="group relative flex flex-col justify-between bg-neutral-900 border border-black/25 h-[420px] lg:h-[480px] overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 shadow-md"
          >
            
            {/* Top Number & Title with fixed sizing to avoid overlapping */}
            <div className="absolute top-0 inset-x-0 p-3 z-20 bg-gradient-to-b from-black/85 via-black/40 to-transparent text-white">
              <div className="font-mono-custom text-[9px] tracking-widest text-[#ED3833] mb-0.5">
                [ {item.id} ]
              </div>
              <h3 className="font-thunder text-xl lg:text-2xl font-extrabold uppercase tracking-wide truncate">
                {item.title}
              </h3>
              <p className="font-mono-custom text-[8px] text-neutral-300 uppercase tracking-tight mt-0.5 line-clamp-2 leading-tight">
                {item.subtitle}
              </p>
            </div>

            {/* Background Model Image */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Sale Stamp for item 08 if applicable */}
            {item.id === "08" && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#ED3833] text-white font-thunder text-2xl font-black px-3 py-1 rotate-[-12deg] shadow-lg border-2 border-white">
                SALE
              </div>
            )}

            {/* Bottom Arrow Indicator */}
            <div className="absolute bottom-3 left-3 z-20 w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white group-hover:bg-[#ED3833] group-hover:border-[#ED3833] transition-colors">
              <span className="text-[10px]">&rarr;</span>
            </div>

          </Link>
        ))}
      </div>

      {/* Bottom Footer Manifesto (Page numbers successfully removed as requested) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-black/20 pt-8 font-mono-custom text-xs uppercase tracking-widest">
        
        {/* Left Manifesto */}
        <div className="lg:col-span-6 space-y-2">
          <p className="font-bold text-[#ED3833]">[ MORE THAN JUST CLOTHES. ]</p>
          <p className="text-neutral-700 leading-relaxed text-[11px]">
            A NEW REALITY, PRESENTING WEARABLE AVANT-GARDE THROUGH SHARP MINIMALISM.
          </p>
        </div>

        {/* Right Description */}
        <div className="lg:col-span-6 text-right text-neutral-600 text-[11px] leading-relaxed hidden lg:block">
          BLENDING GRUNGE AND GLAMOR, THE COLLECTION EMBODIES REBELLION AND TRANSFORMATION.
        </div>

      </div>

    </main>
  );
}