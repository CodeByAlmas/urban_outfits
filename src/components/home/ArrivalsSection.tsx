'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { getProductsFromSupabase, Product } from '@/data/products';

export default function ArrivalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    getProductsFromSupabase().then(data => {
      const allProducts = Object.values(data);
      // Filter products where isNewArrival is true (default true if undefined)
      const filtered = allProducts.filter(p => p.isNewArrival !== false);
      setNewArrivals(filtered);
    });
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const featuredProduct = newArrivals[0];
  const gridProducts = newArrivals.slice(1, 5);

  return (
    <section className="relative w-full h-screen bg-[#FFF9F7] text-black px-6 md:px-12 pt-12 pb-4 flex flex-col justify-center select-none overflow-hidden">
      
      {/* Main Content Grid strictly locked to viewport */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative">
        
        {/* Left Column: Heading, Subtitle & See All Button */}
        <div className="lg:col-span-3 flex flex-col items-start justify-center space-y-3 z-10">
          <div className="space-y-1 w-full -mt-2">
            
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

          <div className="font-serif italic text-sm sm:text-base md:text-lg text-neutral-800 tracking-wide font-normal leading-snug py-1">
            Same Streets.<br />Different Perspective.
          </div>

          <div className="pt-1">
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-between w-36 sm:w-40 px-4 py-2.5 bg-black text-white font-mono-custom text-[11px] uppercase tracking-widest hover:bg-[#ED3833] transition-colors group"
            >
              <span>SEE ALL</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 pt-3 font-mono-custom text-[9px] uppercase tracking-widest text-neutral-500">
            <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>MORE THAN CLOTHES.<br />IT'S A MINDSET.</span>
          </div>
        </div>

        {/* Center Column: Big Featured Product Card with 3D Effect (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 w-full justify-center">
          {featuredProduct ? (
            <Link href={`/shop/${featuredProduct.slug}`} className="w-full block">
              <CardContainer className="inter-var w-full !p-0 !m-0">
                <CardBody className="bg-neutral-900 relative group/card w-full h-[400px] md:h-[450px] !rounded-none !p-0 overflow-hidden shadow-sm border border-neutral-800">
                  
                  <CardItem translateZ="50" className="absolute top-3 left-3 z-20 px-2.5 py-0.5 bg-black text-white font-mono-custom text-[9px] uppercase tracking-widest">
                    NEW
                  </CardItem>

                  <CardItem translateZ="50" className="absolute top-3 right-3 z-20 font-mono-custom text-[8px] uppercase tracking-widest text-neutral-400 text-right leading-tight">
                    WEAR<br />YOUR<br />STORY
                  </CardItem>

                  <CardItem translateZ="100" className="w-full h-full">
                    <img 
                      src={featuredProduct.images?.[0] || featuredProduct.colors?.[0]?.images?.[0] || "/hero-model.png"} 
                      alt={featuredProduct.title} 
                      className="w-full h-full object-cover opacity-90 group-hover/card:scale-105 transition-transform duration-700"
                    />
                  </CardItem>

                  <CardItem translateZ="60" className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white group-hover/card:bg-[#ED3833] group-hover/card:border-[#ED3833] transition-colors text-xs">
                    &rarr;
                  </CardItem>

                  <CardItem translateZ="60" className="absolute bottom-4 left-4 z-20 text-black">
                    <h4 className="font-thunder text-xl tracking-wider uppercase font-bold">{featuredProduct.title}</h4>
                    <p className="font-mono-custom text-[11px] tracking-widest text-neutral-300">{featuredProduct.price}</p>
                  </CardItem>

                </CardBody>
              </CardContainer>
            </Link>
          ) : (
            <div className="w-full h-[400px] md:h-[450px] bg-neutral-200 border-2 border-dashed border-black/30 flex items-center justify-center text-center p-6 font-mono-custom text-xs uppercase tracking-widest text-neutral-500">
              [ NO FEATURED NEW ARRIVAL. ADD FROM ADMIN PANEL ]
            </div>
          )}
        </div>

        {/* Right Column: 2x2 Grid of Smaller Products (Desktop) */}
        <div className="hidden lg:grid lg:col-span-4 grid-cols-2 gap-4 w-full">
          {gridProducts.length > 0 ? (
            gridProducts.map((product) => {
              const cardImg = product.images?.[0] || product.colors?.[0]?.images?.[0] || "/hero-model.png";
              return (
                <Link key={product.slug} href={`/shop/${product.slug}`} className="group/card block">
                  <div className="w-full h-[170px] bg-neutral-200 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 shadow-sm">
                    <img src={cardImg} alt={product.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mt-2 flex justify-between items-center w-full">
                    <div>
                      <h5 className="font-thunder text-xs tracking-wider uppercase font-bold">{product.title}</h5>
                      <p className="font-mono-custom text-[10px] text-neutral-600">{product.price}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-800 font-mono-custom">
                      <span className="w-6 h-[1px] bg-black"></span>
                      <span className="group-hover/card:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-2 py-16 text-center font-mono-custom text-[10px] uppercase text-neutral-400 border border-black/10">
              [ MORE ARRIVALS WILL APPEAR HERE ]
            </div>
          )}
        </div>

        {/* ================= MOBILE VIEW ONLY: Horizontal Scrollable Carousel ================= */}
        <div className="lg:hidden col-span-1 w-full flex flex-col space-y-3">
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full overflow-x-auto flex gap-4 pb-2 pt-2 no-scrollbar snap-x snap-mandatory"
          >
            {newArrivals.length > 0 ? (
              newArrivals.map((product) => {
                const mobImg = product.images?.[0] || product.colors?.[0]?.images?.[0] || "/hero-model.png";
                return (
                  <Link key={product.slug} href={`/shop/${product.slug}`} className="shrink-0 w-[240px] snap-center block bg-neutral-900 text-white relative overflow-hidden shadow-md">
                    <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-black text-white font-mono-custom text-[8px] uppercase tracking-widest">NEW</div>
                    <div className="w-full h-[260px] relative">
                      <img src={mobImg} alt={product.title} className="w-full h-full object-cover opacity-90" />
                    </div>
                    <div className="p-3 bg-neutral-900">
                      <h4 className="font-thunder text-lg tracking-wider uppercase font-bold">{product.title}</h4>
                      <p className="font-mono-custom text-[10px] tracking-widest text-neutral-300">{product.price}</p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="w-full py-12 text-center font-mono-custom text-xs text-neutral-400">
                [ NO NEW ARRIVALS FOUND ]
              </div>
            )}
          </div>

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