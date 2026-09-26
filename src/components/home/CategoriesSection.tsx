'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProductsFromSupabase, Product } from '@/data/products';

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const categoriesData: CategoryItem[] = [
  { id: '01', title: 'OUTERWEAR', subtitle: 'COATS / JACKETS / BOMBERS', image: '/outwear-image.png' },
  { id: '02', title: 'TOPS', subtitle: 'TEES / SHIRTS / HOODIES', image: '/tops-image.png' },
  { id: '03', title: 'BOTTOMS', subtitle: 'PANTS / CARGOS / SHORTS', image: '/bottoms-image.png' },
  { id: '04', title: 'ACCESSORIES', subtitle: 'BAGS / CAPS / BELTS / MORE', image: '/accessories-image.png' },
  { id: '05', title: 'SETS', subtitle: 'CO-ORDS / COMPLETE LOOKS', image: '/sets-image.png' },
];

export default function CategoriesSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [products, setProducts] = useState<Record<string, Product>>({});

  useEffect(() => {
    getProductsFromSupabase().then(data => setProducts(data));
  }, []);

  // Calculate real-time product counts for each category from Supabase database
  const getCategoryCount = (categoryTitle: string) => {
    const list = Object.values(products);
    const count = list.filter(p => p.category?.toUpperCase() === categoryTitle.toUpperCase()).length;
    return `[ ${count} ]`;
  };

  // Infinite loop effect ke liye items ko duplicate kar rahe hain
  const duplicatedCategories = [...categoriesData, ...categoriesData, ...categoriesData];

  return (
    <section className="relative w-full min-h-screen bg-[#FFF9F7] text-black px-6 md:px-12 py-12 flex flex-col justify-between select-none overflow-hidden">
      
      {/* Top Header: 04 CATEGORIES & See All */}
      <div id="categories-section" className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-300 pb-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-500 font-mono-custom text-xs tracking-widest">
            <span className="font-bold">04</span>
            <span className="w-8 h-[1px] bg-red-500"></span>
          </div>
          {/* Responsive font size: smaller on mobile so it never overflows */}
          <h2 className="font-thunder text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-none font-extrabold text-black">
            CATEGORIES
          </h2>
          <p className="font-mono-custom text-[11px] sm:text-xs uppercase tracking-wider text-neutral-600">
            EXPLORE MORE. SAME STREETS. DIFFERENT SIDES.
          </p>
        </div>

        <div className="flex items-end justify-between md:justify-end w-full md:w-auto gap-12 pt-4 md:pt-0">
          <div className="hidden lg:block text-right font-mono-custom text-[11px] uppercase tracking-widest text-neutral-500 leading-tight">
            CLOTHES<br />THAT FIT<br />YOUR REAL LIFE.
          </div>

          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest bg-black text-white px-5 py-3 hover:bg-[#ED3833] transition-colors group"
          >
            <span>[ SEE ALL </span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            <span>]</span>
          </Link>
        </div>
      </div>

      {/* Infinite Loop Conveyor Belt with React State Hover Pause */}
      <div 
        className="w-full overflow-hidden relative py-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex w-max animate-marquee gap-6"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {duplicatedCategories.map((cat, index) => {
            const productCountNum = Object.values(products).filter(p => p.category?.toUpperCase() === cat.title.toUpperCase()).length;

            return (
              <Link 
                key={`${cat.id}-${index}`} 
                href={`/shop?category=${encodeURIComponent(cat.title)}`}
                className="w-[280px] md:w-[320px] h-[420px] bg-neutral-200 relative flex flex-col justify-between p-6 overflow-hidden cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl group/card border border-neutral-300 block"
              >
                {/* Top Card Info */}
                <div className="flex justify-between items-start z-10 font-mono-custom text-xs tracking-widest text-neutral-800">
                  <span className="font-bold">{cat.id}</span>
                  <span>{getCategoryCount(cat.title)}</span>
                </div>

                {/* Background Model Image with zoom effect */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover opacity-90 group-hover/card:scale-110 group-hover/card:rotate-2 transition-transform duration-700"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>

                {/* Bottom Title & Explore Link / Empty Alert */}
                <div className="relative z-10 text-white space-y-2">
                  <div>
                    <h3 className="font-thunder text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider font-bold">
                      {cat.title}
                    </h3>
                    <p className="font-mono-custom text-[10px] tracking-widest text-neutral-300">
                      {cat.subtitle}
                    </p>
                    {productCountNum === 0 && (
                      <span className="inline-block mt-1 text-[9px] font-mono tracking-wider bg-red-600/80 text-white px-2 py-0.5 uppercase">
                        [ NO PRODUCTS LISTED YET ]
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-2 font-mono-custom text-[11px] uppercase tracking-widest text-neutral-200 group-hover/card:text-red-400 transition-colors">
                    <span>EXPLORE</span>
                    <span className="group-hover/card:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Border & Info */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-neutral-300 flex justify-between items-center font-mono-custom text-[10px] uppercase tracking-widest text-neutral-500">
        <span>EST. 2023</span>
        <span>URBAN OUTFITS</span>
        <span>MORE THAN CLOTHES. IT'S A MINDSET.</span>
      </div>

      {/* Tailwind Custom Marquee Animation style */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}</style>

    </section>
  );
}