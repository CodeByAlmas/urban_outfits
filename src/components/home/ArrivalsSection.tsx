'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ArrivalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(isNaN(progress) ? 0 : progress);
    }
  };

  return (
    <section className="relative w-full h-screen bg-[#FFF9F7] text-black px-6 md:px-12 pt-12 pb-4 flex flex-col justify-center select-none overflow-hidden">
      
      {/* Main Content Grid strictly locked to viewport */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative">
        
        {/* Left Column: Heading, Subtitle & See All Button */}
        <div className="lg:col-span-3 flex flex-col items-start justify-center space-y-3 z-10">
          <div className="space-y-1 w-full -mt-2">
            
            {/* Corrected Index numbering matching reference style (Red 02 with line) */}
            <div className="flex items-center gap-3 text-[#ED3833] font-mono-custom text-xs tracking-widest mb-1">
              <span className="font-bold text-sm">02</span>
              <span className="w-8 h-[1px] bg-[#ED3833]"></span>
            </div>

            <h2 className="font-thunder text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.82] font-extrabold whitespace-nowrap">
              NEW<br />ARRIVALS
            </h2>
          </div>

          <p className="font-mono-custom text-[11px] uppercase tracking-wider text-neutral-600 leading-relaxed pt-1">
            FRESH DROPS.<br />BOLDER DAYS.
          </p>

          {/* Cursive / Signature Quote */}
          <div className="font-serif italic text-sm sm:text-base md:text-lg text-neutral-800 tracking-wide font-normal leading-snug py-1">
            Same Streets.<br />Different Perspective.
          </div>

          {/* See All Button */}
          <div className="pt-1">
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-between w-36 sm:w-40 px-4 py-2.5 bg-black text-white font-mono-custom text-[11px] uppercase tracking-widest hover:bg-[#ED3833] transition-colors group"
            >
              <span>SEE ALL</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Bottom Globe Icon & Mindset Text */}
          <div className="hidden sm:flex items-center gap-2.5 pt-3 font-mono-custom text-[9px] uppercase tracking-widest text-neutral-500">
            <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>MORE THAN CLOTHES.<br />IT'S A MINDSET.</span>
          </div>
        </div>

        {/* Center Column: Big Featured Product Card with 3D Effect (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 w-full justify-center">
          <Link href="/shop/essential-hoodie" className="w-full block">
            <CardContainer className="inter-var w-full !p-0 !m-0">
              <CardBody className="bg-neutral-900 relative group/card w-full h-[400px] md:h-[450px] !rounded-none !p-0 overflow-hidden shadow-sm border border-neutral-800">
                
                {/* NEW Tag */}
                <CardItem translateZ="50" className="absolute top-3 left-3 z-20 px-2.5 py-0.5 bg-black text-white font-mono-custom text-[9px] uppercase tracking-widest">
                  NEW
                </CardItem>

                {/* Wear Your Story Tag */}
                <CardItem translateZ="50" className="absolute top-3 right-3 z-20 font-mono-custom text-[8px] uppercase tracking-widest text-neutral-400 text-right leading-tight">
                  WEAR<br />YOUR<br />STORY
                </CardItem>

                {/* Product Image */}
                <CardItem translateZ="100" className="w-full h-full">
                  <img 
                    src="/hero-model.png" 
                    alt="Essential Hoodie" 
                    className="w-full h-full object-cover opacity-90 group-hover/card:scale-105 transition-transform duration-700"
                  />
                </CardItem>

                {/* Arrow Icon bottom right */}
                <CardItem translateZ="60" className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white group-hover/card:bg-[#ED3833] group-hover/card:border-[#ED3833] transition-colors text-xs">
                  &rarr;
                </CardItem>

                {/* Bottom Details */}
                <CardItem translateZ="60" className="absolute bottom-4 left-4 z-20 text-white">
                  <h4 className="font-thunder text-xl tracking-wider uppercase font-bold">ESSENTIAL HOODIE</h4>
                  <p className="font-mono-custom text-[11px] tracking-widest text-neutral-300">₹2,499</p>
                </CardItem>

              </CardBody>
            </CardContainer>
          </Link>
        </div>

        {/* Right Column: 2x2 Grid of Smaller Products (Desktop) */}
        <div className="hidden lg:grid lg:col-span-4 grid-cols-2 gap-4 w-full">
          
          {/* Product 1: Classic Tee */}
          <Link href="/shop/classic-tee" className="group/card block">
            <div className="w-full h-[170px] bg-neutral-200 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 shadow-sm">
              <img src="/hero-model-2.png" alt="Classic Tee" className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
            </div>
            <div className="mt-2 flex justify-between items-center w-full">
              <div>
                <h5 className="font-thunder text-xs tracking-wider uppercase font-bold">CLASSIC TEE</h5>
                <p className="font-mono-custom text-[10px] text-neutral-600">₹999</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-800 font-mono-custom">
                <span className="w-6 h-[1px] bg-black"></span>
                <span className="group-hover/card:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* Product 2: Cargo Pants */}
          <Link href="/shop/cargo-pants" className="group/card block">
            <div className="w-full h-[170px] bg-neutral-200 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 shadow-sm">
              <img src="/hero-model-3.png" alt="Cargo Pants" className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
            </div>
            <div className="mt-2 flex justify-between items-center w-full">
              <div>
                <h5 className="font-thunder text-xs tracking-wider uppercase font-bold">CARGO PANTS</h5>
                <p className="font-mono-custom text-[10px] text-neutral-600">₹1,899</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-800 font-mono-custom">
                <span className="w-6 h-[1px] bg-black"></span>
                <span className="group-hover/card:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* Product 3: Varsity Jacket */}
          <Link href="/shop/varsity-jacket" className="group/card block">
            <div className="w-full h-[170px] bg-neutral-200 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 shadow-sm">
              <img src="/hero-model-4.png" alt="Varsity Jacket" className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
            </div>
            <div className="mt-2 flex justify-between items-center w-full">
              <div>
                <h5 className="font-thunder text-xs tracking-wider uppercase font-bold">VARSITY JACKET</h5>
                <p className="font-mono-custom text-[10px] text-neutral-600">₹3,499</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-800 font-mono-custom">
                <span className="w-6 h-[1px] bg-black"></span>
                <span className="group-hover/card:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* Product 4: Signature Cap */}
          <Link href="/shop/signature-cap" className="group/card block">
            <div className="w-full h-[170px] bg-neutral-200 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 shadow-sm">
              <img src="/hero-model.png" alt="Signature Cap" className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
            </div>
            <div className="mt-2 flex justify-between items-center w-full">
              <div>
                <h5 className="font-thunder text-xs tracking-wider uppercase font-bold">SIGNATURE CAP</h5>
                <p className="font-mono-custom text-[10px] text-neutral-600">₹799</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-800 font-mono-custom">
                <span className="w-6 h-[1px] bg-black"></span>
                <span className="group-hover/card:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

        </div>


        {/* ================= MOBILE VIEW ONLY: Horizontal Scrollable Carousel with Scroll Bar & Progress ================= */}
        <div className="lg:hidden col-span-1 w-full flex flex-col space-y-3">
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full overflow-x-auto flex gap-4 pb-2 pt-2 no-scrollbar snap-x snap-mandatory"
          >
            
            {/* Mobile Card 1: Essential Hoodie */}
            <Link href="/shop/essential-hoodie" className="shrink-0 w-[260px] snap-center block bg-neutral-900 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-black text-white font-mono-custom text-[8px] uppercase tracking-widest">NEW</div>
              <div className="w-full h-[280px] relative">
                <img src="/hero-model.png" alt="Essential Hoodie" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="p-3 bg-neutral-900">
                <h4 className="font-thunder text-lg tracking-wider uppercase font-bold">ESSENTIAL HOODIE</h4>
                <p className="font-mono-custom text-[10px] tracking-widest text-neutral-300">₹2,499</p>
              </div>
            </Link>

            {/* Mobile Card 2: Classic Tee */}
            <Link href="/shop/classic-tee" className="shrink-0 w-[220px] snap-center block bg-neutral-900 text-white relative overflow-hidden shadow-md">
              <div className="w-full h-[280px] relative">
                <img src="/hero-model-2.png" alt="Classic Tee" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="p-3 bg-neutral-900">
                <h4 className="font-thunder text-lg tracking-wider uppercase font-bold">CLASSIC TEE</h4>
                <p className="font-mono-custom text-[10px] tracking-widest text-neutral-300">₹999</p>
              </div>
            </Link>

            {/* Mobile Card 3: Cargo Pants */}
            <Link href="/shop/cargo-pants" className="shrink-0 w-[220px] snap-center block bg-neutral-900 text-white relative overflow-hidden shadow-md">
              <div className="w-full h-[280px] relative">
                <img src="/hero-model-3.png" alt="Cargo Pants" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="p-3 bg-neutral-900">
                <h4 className="font-thunder text-lg tracking-wider uppercase font-bold">CARGO PANTS</h4>
                <p className="font-mono-custom text-[10px] tracking-widest text-neutral-300">₹1,899</p>
              </div>
            </Link>

            {/* Mobile Card 4: Varsity Jacket */}
            <Link href="/shop/varsity-jacket" className="shrink-0 w-[220px] snap-center block bg-neutral-900 text-white relative overflow-hidden shadow-md">
              <div className="w-full h-[280px] relative">
                <img src="/hero-model-4.png" alt="Varsity Jacket" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="p-3 bg-neutral-900">
                <h4 className="font-thunder text-lg tracking-wider uppercase font-bold">VARSITY JACKET</h4>
                <p className="font-mono-custom text-[10px] tracking-widest text-neutral-300">₹3,499</p>
              </div>
            </Link>

          </div>

          {/* Scroll Progress Bar Indicator for Mobile */}
          <div className="w-full bg-neutral-200 h-[3px] rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-black transition-all duration-150"
              style={{ width: `${Math.max(scrollProgress, 15)}%` }}
            ></div>
          </div>

        </div>

      </div>

    </section>
  );
}