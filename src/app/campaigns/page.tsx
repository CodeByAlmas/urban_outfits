'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const campaignsData = [
  {
    id: "01",
    title: "A LOUDER YOU.",
    subtitle: "URBN FW'24 — OFFICIAL CAMPAIGN",
    description: "A visual story for the ones who don't fit in. A celebration of self, style and freedom.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "FW'24"
  },
  {
    id: "02",
    title: "THE ONES OUTSIDE",
    subtitle: "URBN SS'25 — CAMPAIGN",
    description: "Defying traditional boundaries through raw silhouettes and attitude.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "SS'25"
  },
  {
    id: "03",
    title: "SAME CITY. DIFFERENT MINDS.",
    subtitle: "URBN CITY SERIES",
    description: "Urban architecture meets modern technical apparel for nocturnal movement.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "CITY SERIES"
  },
  {
    id: "04",
    title: "NOT A TREND.",
    subtitle: "URBN FW'24 ARCHIVE",
    description: "Permanent style built to last beyond seasonal cycles and fast fashion noise.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "FW'24"
  },
  {
    id: "05",
    title: "PEOPLE LIKE US",
    subtitle: "URBN ORIGINAL",
    description: "Community-driven design expression exploring collective identity.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "ORIGINAL"
  },
  {
    id: "06",
    title: "BEYOND THE FIT",
    subtitle: "URBN DOCUMENTARY",
    description: "An inside look into the design studios and artisan workflows.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "DOCUMENTARY"
  },
  {
    id: "07",
    title: "NOCTURNAL SHIFT",
    subtitle: "URBN LABS",
    description: "Reflective textiles and weather-adaptive materials engineered for extremes.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "LABS"
  },
  {
    id: "08",
    title: "SILENT ECHO",
    subtitle: "URBN STUDIO",
    description: "Minimalist brutalist tailoring combined with avant-garde aesthetics.",
    tag: "[ FEATURED ]",
    notMadeForNormal: "NOT MADE FOR NORMAL",
    videoUrl: "/film-video.mp4",
    category: "STUDIO"
  },
];

const allCampaignsGrid = [
  { id: "02", title: "THE ONES OUTSIDE", category: "URBN SS'25", duration: "01:12", videoUrl: "/film-video.mp4", type: "SS'25" },
  { id: "03", title: "SAME CITY. DIFFERENT MINDS.", category: "URBN CITY SERIES", duration: "00:48", videoUrl: "/film-video.mp4", type: "CITY SERIES" },
  { id: "04", title: "NOT A TREND.", category: "URBN FW'24", duration: "01:30", videoUrl: "/film-video.mp4", type: "FW'24" },
  { id: "05", title: "PEOPLE LIKE US", category: "URBN ORIGINAL", duration: "00:55", videoUrl: "/film-video.mp4", type: "ORIGINAL" },
  { id: "06", title: "BEYOND THE FIT", category: "URBN DOCUMENTARY", duration: "01:08", videoUrl: "/film-video.mp4", type: "DOCUMENTARY" },
];

export default function CampaignsPage() {
  const [activeId, setActiveId] = useState("01");
  const [sortOption, setSortOption] = useState("LATEST");
  const [filterOption, setFilterOption] = useState("ALL");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Modal Full Player State
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const currentFeatured = campaignsData.find(c => c.id === activeId) || campaignsData[0];

  const sideIndicators = ["01", "02", "03", "04", "05", "06", "07", "08"];

  // Filtered Grid Logic
  const filteredGrid = allCampaignsGrid.filter(item => {
    if (filterOption === "ALL") return true;
    return item.type === filterOption;
  });

  // Sorted Grid Logic
  const sortedGrid = [...filteredGrid].sort((a, b) => {
    if (sortOption === "LATEST") return b.id.localeCompare(a.id);
    if (sortOption === "OLDEST") return a.id.localeCompare(b.id);
    if (sortOption === "NAME") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-28 pb-16 px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Top Section Tag */}
      <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase mb-4">
        [ CAMPAIGNS ]
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: Title (Font size reduced to prevent overlap) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h1 className="font-thunder text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              STORIES<br />
              THAT MOVE.
            </h1>
            <p className="font-mono-custom text-xs uppercase tracking-[0.2em] text-neutral-700 mb-8 leading-relaxed">
              MORE THAN<br />
              JUST CLOTHES.
            </p>
          </div>

          <div className="hidden lg:block font-serif italic text-neutral-400 text-lg rotate-[-4deg] mt-12">
            "Different people. Same URBN."
          </div>
        </div>

        {/* Right Column: Featured Video Banner + Right Sidebar Indicators */}
        <div className="lg:col-span-7 flex items-center gap-6">
          
          {/* Main Featured Video Container */}
          <div 
            onClick={() => setActiveVideo(currentFeatured.videoUrl)}
            className="relative w-full h-[360px] sm:h-[420px] bg-neutral-900 border border-black/20 overflow-hidden group cursor-pointer flex-1 shadow-md"
          >
            
            {/* Top Indicator */}
            <div className="absolute top-4 left-4 z-20 font-mono-custom text-xs text-white bg-black/60 px-2 py-1 tracking-widest">
              {currentFeatured.id} / 08
            </div>

            {/* Featured Tag */}
            <div className="absolute top-4 right-4 z-20 font-mono-custom text-xs text-white bg-black/60 px-2.5 py-1 tracking-widest border border-white/20">
              {currentFeatured.tag}
            </div>

            {/* Background Video */}
            <video 
              src={currentFeatured.videoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-80"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-white ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Bottom Content inside Banner */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-thunder text-3xl sm:text-5xl font-black uppercase text-white tracking-wide mb-1">
                  {currentFeatured.title}
                </h2>
                <div className="font-mono-custom text-[10px] text-neutral-300 uppercase tracking-widest mb-2">
                  {currentFeatured.subtitle}
                </div>
                <p className="font-mono-custom text-[11px] text-neutral-400 max-w-md hidden sm:block leading-relaxed">
                  {currentFeatured.description}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-serif italic text-white/80 text-sm hidden sm:block">
                  {currentFeatured.notMadeForNormal}
                </span>
                <span className="font-mono-custom text-xs text-white font-bold tracking-widest hover:text-[#ED3833] transition-colors flex items-center gap-1 cursor-pointer">
                  WATCH NOW →
                </span>
              </div>
            </div>

          </div>

          {/* Right Floating Numbered Indicators (01 to 08) with Red Active Pill */}
          <div className="hidden xl:flex flex-col items-end space-y-2 font-mono-custom text-xs text-neutral-500">
            <span className="text-[10px] tracking-widest text-black mb-2 text-right">CLOTHES<br/>FOR A LOUDER<br/>YOU.</span>
            <div className="w-8 h-[1px] bg-black/30 mb-2"></div>
            {sideIndicators.map((num) => (
              <button
                key={num}
                onClick={() => setActiveId(num)}
                className={`transition-all cursor-pointer px-2 py-0.5 ${activeId === num ? 'bg-[#ED3833] text-white font-bold' : 'hover:text-black'}`}
              >
                {num}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* All Campaigns Section Header */}
      <div className="border-t border-black/15 pt-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono-custom text-xs uppercase tracking-widest gap-4">
        <span className="font-bold text-black text-sm">[ ALL CAMPAIGNS ]</span>
        
        <div className="flex items-center gap-8 relative">
          
          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="text-neutral-500">SORT BY :</span>
              <span className="font-bold hover:text-[#ED3833]">{sortOption} ▾</span>
            </button>

            {isSortOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-[#FFF9F7] border border-black/20 shadow-xl z-50 py-2 flex flex-col">
                {["LATEST", "OLDEST", "NAME"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortOption(opt); setIsSortOpen(false); }}
                    className={`px-4 py-1.5 text-left hover:bg-black hover:text-white transition-colors ${sortOption === opt ? 'font-bold text-[#ED3833]' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className={`px-2 py-0.5 text-white font-bold bg-[#ED3833]`}>{filterOption} ▾</span>
            </button>

            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-[#FFF9F7] border border-black/20 shadow-xl z-50 py-2 flex flex-col">
                {["ALL", "SS'25", "CITY SERIES", "FW'24", "ORIGINAL", "DOCUMENTARY"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setFilterOption(cat); setIsFilterOpen(false); }}
                    className={`px-4 py-1.5 text-left hover:bg-black hover:text-white transition-colors ${filterOption === cat ? 'font-bold text-[#ED3833]' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {sortedGrid.length === 0 ? (
          <div className="col-span-full py-16 text-center font-mono-custom text-xs text-neutral-500 uppercase tracking-widest">
            [ NO CAMPAIGNS FOUND FOR THIS FILTER ]
          </div>
        ) : (
          sortedGrid.map((camp) => (
            <div 
              key={camp.id} 
              onClick={() => setActiveVideo(camp.videoUrl)}
              className="flex flex-col group cursor-pointer bg-[#FFF9F7]"
            >
              
              {/* Card Video Box */}
              <div className="relative w-full h-[260px] bg-neutral-900 border border-black/20 overflow-hidden mb-3">
                
                <div className="absolute top-2 left-2 z-10 font-mono-custom text-[10px] text-white bg-black/60 px-1.5 py-0.5 tracking-widest">
                  {camp.id}
                </div>

                <div className="absolute top-2 right-2 z-10 font-mono-custom text-[10px] text-white bg-black/60 px-1.5 py-0.5 tracking-widest">
                  {camp.duration}
                </div>

                {/* Play Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 z-10">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <video 
                  src={camp.videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Details */}
              <div className="flex items-start justify-between font-mono-custom text-xs uppercase tracking-widest pt-1 border-t border-black/10">
                <div>
                  <div className="font-bold text-black group-hover:text-[#ED3833] transition-colors">{camp.title}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{camp.category}</div>
                </div>
                <span className="font-bold hover:text-[#ED3833] transition-colors">→</span>
              </div>

            </div>
          ))
        )}
      </div>

      {/* FULLSCREEN VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white hover:text-[#ED3833] transition-colors font-mono-custom text-3xl p-3 cursor-pointer z-50 bg-black/50 rounded-full"
          >
            ✕
          </button>

          {/* Video Player Container */}
          <div className="relative w-full max-w-5xl aspect-video bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
            <video 
              src={activeVideo} 
              autoPlay 
              controls 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      )}

    </main>
  );
}