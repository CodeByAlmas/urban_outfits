'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Publications Data matching reference layout
const publicationsData = [
  {
    id: "01",
    category: "EDITORIAL",
    title: "THE NEW ORDER",
    description: "A visual exploration of streets, style and the next generation.",
    image: "/identity-character.png",
    featured: true,
    slug: "/publications/the-new-order"
  },
  {
    id: "02",
    category: "EDITORIAL",
    magazine: "GLAMOUR",
    title: "URBAN YOUTH",
    image: "/hero-model.png",
    slug: "/publications/urban-youth"
  },
  {
    id: "03",
    category: "LOOKBOOKS",
    magazine: "ELLE",
    title: "STREET PERSPECTIVES",
    image: "/hero-model-2.png",
    slug: "/publications/street-perspectives"
  },
  {
    id: "04",
    category: "CAMPAIGNS",
    magazine: "HYPEBEAST",
    title: "CULTURE IN MOTION",
    image: "/hero-model-3.png",
    slug: "/publications/culture-in-motion"
  },
  {
    id: "05",
    category: "FEATURES",
    magazine: "VOGUE",
    title: "THE URBAN GENERATION",
    image: "/hero-model-4.png",
    slug: "/publications/the-urban-generation"
  },
  {
    id: "06",
    category: "EDITORIAL",
    magazine: "GQ",
    title: "SOUND & STYLE",
    image: "/identity-character.png",
    slug: "/publications/sound-and-style"
  },
  {
    id: "07",
    category: "CAMPAIGNS",
    magazine: "DAZED",
    title: "REBELLION ALWAYS FITS",
    image: "/hero-model.png",
    slug: "/publications/rebellion-always-fits"
  },
];

export default function PublicationsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Filter items based on active category tab
  const filteredItems = activeFilter === "ALL" 
    ? publicationsData 
    : publicationsData.filter(item => item.category === activeFilter);

  const featuredItem = publicationsData[0];

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-28 pb-16 px-6 md:px-12 select-none overflow-x-hidden relative">
      
      {/* Lightbox Modal for Full Image View */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white font-mono-custom text-xs uppercase tracking-widest bg-neutral-800 px-3 py-1.5 hover:bg-[#ED3833] transition-colors z-50 cursor-pointer"
              onClick={() => setLightboxImg(null)}
            >
              [ CLOSE X ]
            </button>
            <img 
              src={lightboxImg} 
              alt="Expanded Publication" 
              className="max-w-full max-h-[85vh] object-contain border border-neutral-800 shadow-2xl"
            />
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Top Hero Section with Title & Perfectly Positioned Cutout Asset */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left Title & Subtext */}
          <div className="lg:col-span-7 space-y-6 z-20">
            <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase flex items-center gap-3">
              <span>[ VISUAL ARCHIVE ]</span>
            </div>

            <h1 className="font-thunder text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-black">
              PUBLICATIONS
            </h1>

            <p className="font-mono-custom text-xs uppercase tracking-[0.15em] text-neutral-800 leading-relaxed max-w-md font-bold">
              STORIES FROM THE STREETS.<br />
              PEOPLE. PLACES. IDEAS.<br />
              MORE THAN JUST CLOTHES.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3 pt-4 font-mono-custom text-xs uppercase tracking-widest">
              {["ALL", "EDITORIAL", "CAMPAIGNS", "LOOKBOOKS", "FEATURES"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 border transition-colors cursor-pointer ${
                    activeFilter === tab 
                      ? 'bg-black text-white border-black' 
                      : 'bg-transparent text-neutral-800 border-black/30 hover:border-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right Cutout Asset matched exactly to reference image top-right coverage */}
          <div className="hidden lg:flex lg:col-span-5 absolute -top-16 right-0 justify-end z-10 pointer-events-none">
            <img 
              src="/publications-hero.png" 
              alt="Publications Hero Asset" 
              className="w-full max-w-md xl:max-w-lg object-contain drop-shadow-2xl scale-130 transform translate-x-0 -translate-y-0"
            />
          </div>

        </div>

        {/* FEATURED ISSUE 01 BANNER */}
        {(activeFilter === "ALL" || activeFilter === "EDITORIAL") && (
          <div className="w-full bg-neutral-900 border border-black/20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-6 left-6 z-20 font-mono-custom text-xs uppercase tracking-widest text-[#ED3833]">
              [ FEATURED ]
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Image (Clickable for Lightbox) */}
              <div 
                className="lg:col-span-7 relative h-[350px] sm:h-[450px] overflow-hidden cursor-pointer group"
                onClick={() => setLightboxImg(featuredItem.image)}
              >
                <img 
                  src={featuredItem.image} 
                  alt={featuredItem.title} 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 font-mono-custom text-[10px] text-white bg-black/70 px-2 py-1 uppercase tracking-widest">
                  [ CLICK TO EXPAND ]
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="font-mono-custom text-xs text-neutral-400 uppercase tracking-widest">
                    ISSUE 01
                  </div>
                  <h2 className="font-thunder text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                    {featuredItem.title}
                  </h2>
                  <p className="font-mono-custom text-xs uppercase tracking-wider text-neutral-300 leading-relaxed">
                    {featuredItem.description}
                  </p>
                </div>

                <div className="pt-4">
                  <Link 
                    href={featuredItem.slug}
                    className="inline-flex items-center justify-between w-48 px-5 py-3 bg-white text-black font-mono-custom text-xs uppercase tracking-widest hover:bg-[#ED3833] hover:text-white transition-colors group"
                  >
                    <span>VIEW STORY</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* GRID OF PUBLICATIONS (Issues 02 to 07) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.filter(item => item.id !== "01" || activeFilter !== "ALL").map((item) => (
            <div 
              key={item.id}
              className="group relative bg-neutral-900 border border-black/20 h-[380px] sm:h-[420px] overflow-hidden shadow-md flex flex-col justify-between cursor-pointer"
            >
              
              {/* Top Magazine / Issue Badge */}
              <div className="absolute top-0 inset-x-0 p-5 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white">
                <div>
                  <div className="font-mono-custom text-[10px] text-neutral-400 uppercase tracking-widest">
                    ISSUE {item.id}
                  </div>
                  <h4 className="font-thunder text-2xl font-extrabold uppercase tracking-wide text-white mt-1">
                    {item.title}
                  </h4>
                </div>
                {item.magazine && (
                  <span className="font-serif italic font-bold text-lg tracking-wider text-white bg-black/60 px-2 py-0.5 border border-white/20">
                    {item.magazine}
                  </span>
                )}
              </div>

              {/* Background Image (Clickable for Lightbox) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden"
                onClick={() => setLightboxImg(item.image)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover filter grayscale contrast-125 opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Bottom Action Link */}
              <div className="absolute bottom-5 right-5 z-20">
                <Link 
                  href={item.slug}
                  className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white bg-black/40 group-hover:bg-[#ED3833] group-hover:border-[#ED3833] transition-colors"
                >
                  <span className="text-xs">&rarr;</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* URBAN OUTFITS FILM 01 BANNER */}
        <div className="w-full bg-black text-white p-8 md:p-14 border border-neutral-800 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono-custom text-xs uppercase tracking-[0.3em] text-[#ED3833]">
                [ VIDEO ARCHIVE ]
              </div>
              <h3 className="font-thunder text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                URBAN OUTFITS<br />FILM 01
              </h3>
              <p className="font-mono-custom text-xs uppercase tracking-wider text-neutral-400">
                A LOUDER YOU.
              </p>
              <div className="pt-2">
                <Link 
                  href="/publications/film-01"
                  className="inline-flex items-center justify-between w-44 px-5 py-3 bg-[#ED3833] text-white font-mono-custom text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors group"
                >
                  <span>WATCH NOW</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Video / Film Preview Box with Play Button */}
            <div 
              className="lg:col-span-7 relative h-[280px] sm:h-[340px] bg-neutral-900 border border-neutral-800 overflow-hidden cursor-pointer group"
              onClick={() => setLightboxImg("/identity-character.png")}
            >
              <img 
                src="/identity-character.png" 
                alt="Film 01 Preview" 
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-white bg-black/60 group-hover:bg-[#ED3833] group-hover:border-[#ED3833] transition-colors shadow-2xl">
                  <span className="text-xl ml-1">&#9658;</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </main>
  );
}