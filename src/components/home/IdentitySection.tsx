'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function IdentitySection() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [characterOffset, setCharacterOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    
    // Custom cursor position relative to section
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Character parallax movement calculation based on center of section
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (e.clientX - rect.left - centerX) / 30;
    const moveY = (e.clientY - rect.top - centerY) / 30;

    setCharacterOffset({ x: moveX, y: moveY });
  };

  return (
    <Link href="/about" className="block w-full">
      <section 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-screen bg-[#FFF9F7] text-black px-6 md:px-12 py-12 flex flex-col justify-between select-none overflow-hidden cursor-none"
      >
        
        {/* Custom Floating Cursor [ WHO WE ARE ] - Fixed width, no shrinking */}
        {isHovered && (
          <div 
            className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center px-5 py-2.5 bg-black/90 backdrop-blur-md text-white font-mono-custom text-xs uppercase tracking-[0.25em] font-bold shadow-2xl rounded-full whitespace-nowrap"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          >
            [ WHO WE ARE ]
          </div>
        )}

        {/* Background Image Layer with Textured Branding Typography behind */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Background base image saved as identity-bg.png */}
          <img 
            src="/identity-bg.png" 
            alt="Identity Background" 
            className="w-full h-full object-cover opacity-85"
          />
        </div>

        {/* Top Header / Section ID */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3 font-mono-custom text-xs tracking-widest">
            <span className="text-red-500 font-bold">05</span>
            <span className="w-8 h-[1px] bg-red-500"></span>
            <span className="text-neutral-900 uppercase font-bold tracking-widest">IDENTITY</span>
          </div>

          <div className="hidden md:block font-mono-custom text-[10px] uppercase tracking-[0.25em] text-neutral-500 text-right">
            CLOTHES THAT MOVE WITH YOU.
          </div>
        </div>

        {/* Main Content Grid Area */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
          
          {/* Left Column: WHO WE ARE Heading & Description */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center space-y-6">
            <div className="space-y-0">
              <h2 className="font-thunder text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.82] font-extrabold text-black drop-shadow-sm">
                WHO<br />WE ARE
              </h2>
            </div>

            <p className="font-mono-custom text-xs md:text-sm uppercase tracking-wider text-neutral-700 leading-relaxed max-w-sm">
              Urban Outfits is about wearing what reflects your mindset — your <span className="text-red-600 font-bold">energy</span>, your <span className="text-red-600 font-bold">identity</span>.
            </p>

            {/* Globe & Mindset Tag */}
            <div className="flex items-center gap-3 pt-2 font-mono-custom text-[10px] uppercase tracking-widest text-neutral-600">
              <svg className="w-5 h-5 text-neutral-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>MORE THAN CLOTHES.<br />IT'S A MINDSET.</span>
            </div>
          </div>

          {/* Center / Foreground: Character Without Background with Parallax Effect & Left Shift */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 lg:relative lg:col-span-4 lg:inset-auto -translate-x-6">
            <img 
              src="/identity-character.png" 
              alt="Character Model" 
              className="w-auto h-[70vh] md:h-[80vh] object-contain drop-shadow-2xl transition-transform duration-100 ease-out"
              style={{
                transform: `translate3d(${characterOffset.x}px, ${characterOffset.y}px, 0px)`
              }}
            />
          </div>

          {/* Right Column: Creative Freedom Branding */}
          <div className="lg:col-span-3 flex flex-col items-end justify-between h-full self-end lg:self-center">
            <div className="hidden lg:block text-right space-y-1 font-mono-custom text-[10px] uppercase tracking-widest text-neutral-500">
              <span>// 05_VISION</span>
              <div className="w-[1px] h-16 bg-neutral-400 mx-auto my-3"></div>
            </div>

            <div className="text-right space-y-1 pt-12 lg:pt-0">
              <span className="font-mono-custom text-xs uppercase tracking-widest text-neutral-500">(CREATIVE)</span>
              <h3 className="font-thunder text-5xl md:text-6xl uppercase tracking-tighter font-extrabold text-black flex items-center justify-end gap-1">
                FREEDOM<span className="w-3 h-3 bg-red-600 rounded-full inline-block"></span>
              </h3>
            </div>
          </div>

        </div>

        {/* Bottom Footer Border & Info */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-neutral-300 flex justify-between items-center font-mono-custom text-[10px] uppercase tracking-widest text-neutral-500">
          <span>EST. 2023</span>
          <span>URBAN OUTFITS</span>
          <span>BUILT FOR THE STREETS</span>
        </div>

      </section>
    </Link>
  );
}