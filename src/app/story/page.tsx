'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OurStoryPage() {
  const [activeTab, setActiveTab] = useState<'manifesto' | 'origins' | 'vision'>('manifesto');

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom pt-28 pb-32 px-4 sm:px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto border-b border-black/20 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#ED3833] font-bold">[ 02. COMPANY / OUR STORY ]</span>
        <h1 className="font-thunder text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight mt-2 break-words">
          NOT JUST CLOTHING. A MOVEMENT.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-3 max-w-2xl leading-relaxed">
          Born in the streets of India. Crafted for the ones who refuse to blend into the background. This is the URBN manifesto.
        </p>
      </div>

      {/* Interactive Tabs for Story Chapters (Fully Working Buttons) */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-12 border-b border-black/10 pb-6">
        <button 
          onClick={() => setActiveTab('manifesto')}
          className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
            activeTab === 'manifesto' ? 'bg-black text-white shadow-md' : 'border border-black/20 bg-white hover:border-black'
          }`}
        >
          [ 01. THE MANIFESTO ]
        </button>
        <button 
          onClick={() => setActiveTab('origins')}
          className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
            activeTab === 'origins' ? 'bg-black text-white shadow-md' : 'border border-black/20 bg-white hover:border-black'
          }`}
        >
          [ 02. ROUGH ORIGINS ]
        </button>
        <button 
          onClick={() => setActiveTab('vision')}
          className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
            activeTab === 'vision' ? 'bg-black text-white shadow-md' : 'border border-black/20 bg-white hover:border-black'
          }`}
        >
          [ 03. FUTURE VISION ]
        </button>
      </div>

      {/* Dynamic Content Section based on Active Tab */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        
        {/* Left Big Text / Display */}
        <div className="lg:col-span-7 bg-white border border-black/20 p-6 sm:p-10 shadow-sm space-y-6">
          {activeTab === 'manifesto' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ CHAPTER ONE ]</span>
              <h2 className="font-thunder text-3xl sm:text-4xl font-bold uppercase tracking-wider">
                SAME PEOPLE. DIFFERENT PERSPECTIVE.
              </h2>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-700 leading-relaxed">
                URBN was built on a simple realization: Indian streetwear was missing its voice. We didn't want recycled western templates; we wanted architectural silhouettes, heavy 450GSM fabrics, and brutalist aesthetics that speak louder than words.
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-700 leading-relaxed">
                Every drop is an issue. Every piece is numbered. We design for the current generation shaping tomorrow.
              </p>
            </div>
          )}

          {activeTab === 'origins' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ CHAPTER TWO ]</span>
              <h2 className="font-thunder text-3xl sm:text-4xl font-bold uppercase tracking-wider">
                FROM A BASEMENT STUDIO TO PAN-INDIA.
              </h2>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-700 leading-relaxed">
                Started in 2023 with a single sewing machine and a laptop running raw AI mockups. We experimented with folds, oversized fits, and paper-cutout brutalist branding until we struck the exact balance between comfort and presence.
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-700 leading-relaxed">
                No middlemen. Direct WhatsApp custom quotes for true enthusiasts. Absolute transparency in pricing and materials.
              </p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ CHAPTER THREE ]</span>
              <h2 className="font-thunder text-3xl sm:text-4xl font-bold uppercase tracking-wider">
                THE NEXT DECADE OF STREETWEAR.
              </h2>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-700 leading-relaxed">
                We are merging physical apparel with digital media agency roots (Almas Studio tech backing). Expect interactive drops, augmented reality lookbooks, and limited-edition runs that sell out in minutes.
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-700 leading-relaxed">
                You aren't just wearing clothes. You're wearing a statement.
              </p>
            </div>
          )}
        </div>

        {/* Right Side Callout / Stats Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-black bg-black text-white p-6 sm:p-8 space-y-4">
            <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ CORE PILLARS ]</span>
            <ul className="space-y-3 text-xs uppercase tracking-widest divide-y divide-white/10">
              <li className="pt-2">01. Uncompromising Heavyweight Quality</li>
              <li className="pt-3">02. Direct WhatsApp Custom Quotations</li>
              <li className="pt-3">03. Gen-Z Brutalist Design Language</li>
              <li className="pt-3">04. Zero Waste, Limited Batch Drops</li>
            </ul>
          </div>

          <div className="border border-black/20 bg-white p-6 flex justify-between items-center">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500">[ READY TO EXPLORE? ]</div>
              <div className="font-thunder text-2xl uppercase font-bold mt-1">CHECK OUT OUR DROPS</div>
            </div>
            <Link 
              href="/shop/all"
              className="bg-black text-white px-4 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#ED3833] transition-colors"
            >
              SHOP →
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Spacer to prevent footer overlap on mobile */}
      <div className="w-full h-32 sm:h-48 pointer-events-none" aria-hidden="true" />
    </main>
  );
}