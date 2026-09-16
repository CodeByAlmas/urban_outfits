'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Extended product data with categories and sizes for filtering & counting
const products = [
  { id: "01", slug: "techwear-jacket", name: "TECHWEAR JACKET", price: "₹ 4,990", category: "OUTERWEAR", size: "L", sales: 120, image: "/film-video.mp4" },
  { id: "02", slug: "oversized-tee", name: "OVERSIZED TEE", price: "₹ 1,990", category: "TOPS", size: "M", sales: 250, image: "/film-video.mp4" },
  { id: "03", slug: "cargo-trousers", name: "CARGO TROUSERS", price: "₹ 3,490", category: "BOTTOMS", size: "32", sales: 180, image: "/film-video.mp4" },
  { id: "04", slug: "cutout-top", name: "CUTOUT TOP", price: "₹ 2,490", category: "TOPS", size: "S", sales: 90, image: "/film-video.mp4" },
  { id: "05", slug: "essential-hoodie", name: "ESSENTIAL HOODIE", price: "₹ 2,990", category: "OUTERWEAR", size: "XL", sales: 300, image: "/film-video.mp4" },
  { id: "06", slug: "logo-cap", name: "LOGO CAP", price: "₹ 1,290", category: "ACCESSORIES", size: "ONE SIZE", sales: 210, image: "/film-video.mp4" },
  { id: "07", slug: "knit-sweater", name: "KNIT SWEATER", price: "₹ 3,990", category: "TOPS", size: "M", sales: 150, image: "/film-video.mp4" },
  { id: "08", slug: "urbn-sneakers", name: "URBN SNEAKERS", price: "₹ 5,990", category: "FOOTWEAR", size: "10", sales: 340, image: "/film-video.mp4" },
];

const categories = ["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "SETS", "ACCESSORIES", "FOOTWEAR", "LIMITED EDITION", "SALE"];
const sizesList = ["ALL", "S", "M", "L", "XL", "32", "10", "ONE SIZE"];
const sortOptions = ["BEST SELLING", "PRICE: LOW TO HIGH", "PRICE: HIGH TO LOW", "NEWEST"];

export default function ShopAllPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("BEST SELLING");
  
  // Dropdown states
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // Grid layout view state (4-grid, 2-grid, 1-grid)
  const [gridCols, setGridCols] = useState<4 | 2 | 1>(4);

  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 1. Filter by Category
  let filtered = selectedCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // 2. Filter by Size
  if (selectedSize !== "ALL") {
    filtered = filtered.filter(p => p.size === selectedSize);
  }

  // 3. Sort Logic
  const sortedProducts = [...filtered].sort((a, b) => {
    if (selectedSort === "BEST SELLING") return b.sales - a.sales;
    if (selectedSort === "PRICE: LOW TO HIGH") {
      return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
    }
    if (selectedSort === "PRICE: HIGH TO LOW") {
      return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
    }
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-24 sm:pt-28 pb-12 px-4 sm:px-6 md:px-12 select-none">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-black/15 pb-6 sm:pb-8 mb-6 sm:mb-8 gap-6">
        <div>
          <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase mb-4">
            [ SHOP ALL ]
          </div>
          {/* Responsive Heading with auto-scaling to stay in one line */}
          <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none break-words">
            ALL PRODUCTS
          </h1>
        </div>

        {/* Center/Right Info & Manifesto with Dynamic Item Count */}
        <div className="flex flex-row sm:flex-col lg:flex-row items-start sm:items-end justify-between lg:items-end gap-4 sm:gap-8">
          <div className="font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest text-neutral-600">
            [ {sortedProducts.length < 10 ? `0${sortedProducts.length}` : sortedProducts.length} -ITEMS ]
          </div>
          
          <div className="hidden md:block font-mono-custom text-[11px] uppercase tracking-[0.2em] leading-relaxed text-neutral-700 border-l border-black/20 pl-4">
            SAME<br />
            PEOPLE.<br />
            DIFFERENT<br />
            PERSPECTIVE.
          </div>

          <div className="hidden xl:block font-mono-custom text-[11px] uppercase tracking-[0.2em] text-neutral-500 text-right">
            CLOTHES<br />
            FOR A LOUDER<br />
            YOU.
          </div>
        </div>
      </div>

      {/* Filter & Toolbar Row */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between border-b border-black/15 pb-6 mb-8 sm:mb-10 gap-6 relative">
        
        {/* Category Pills (Horizontal scrollable on mobile for responsiveness) */}
        <div className="w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 flex items-center gap-2 md:gap-3 font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  isSelected 
                    ? 'bg-[#ED3833] text-white font-bold shadow-md' 
                    : 'bg-transparent hover:text-[#ED3833]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sorting & Grid View Toggles */}
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 sm:gap-6 font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest w-full xl:w-auto xl:justify-end relative">
          
          {/* Size Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setIsSizeOpen(!isSizeOpen); setIsSortOpen(false); }}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="text-neutral-500">SIZE +</span>
              <span className="font-bold hover:text-[#ED3833]">{selectedSize} ▾</span>
            </button>

            {isSizeOpen && (
              <div className="absolute top-full left-0 mt-2 w-36 bg-[#FFF9F7] border border-black/20 shadow-xl z-50 py-2 flex flex-col">
                {sizesList.map(sz => (
                  <button
                    key={sz}
                    onClick={() => { setSelectedSize(sz); setIsSizeOpen(false); }}
                    className={`px-4 py-1.5 text-left hover:bg-black hover:text-white transition-colors ${selectedSize === sz ? 'font-bold text-[#ED3833]' : ''}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setIsSortOpen(!isSortOpen); setIsSizeOpen(false); }}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="text-neutral-500">SORT BY +</span>
              <span className="font-bold hover:text-[#ED3833]">{selectedSort} ▾</span>
            </button>

            {isSortOpen && (
              <div className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 w-52 bg-[#FFF9F7] border border-black/20 shadow-xl z-50 py-2 flex flex-col">
                {sortOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedSort(opt); setIsSortOpen(false); }}
                    className={`px-4 py-1.5 text-left hover:bg-black hover:text-white transition-colors ${selectedSort === opt ? 'font-bold text-[#ED3833]' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reference Grid Layout Icons */}
          <div className="hidden sm:flex items-center gap-2 text-neutral-500 pl-4 border-l border-black/20">
            <button 
              onClick={() => setGridCols(4)}
              className={`cursor-pointer transition-colors ${gridCols === 4 ? 'text-black font-bold' : 'hover:text-black'}`}
              title="4 Column Grid"
            >
              ■■■
            </button>
            <button 
              onClick={() => setGridCols(2)}
              className={`cursor-pointer transition-colors ${gridCols === 2 ? 'text-black font-bold' : 'hover:text-black'}`}
              title="2 Column Grid"
            >
              ■■
            </button>
            <button 
              onClick={() => setGridCols(1)}
              className={`cursor-pointer transition-colors ${gridCols === 1 ? 'text-black font-bold' : 'hover:text-black'}`}
              title="Single Column"
            >
              ■
            </button>
          </div>
        </div>

      </div>

      {/* Product Grid */}
      <div className={`grid grid-cols-1 ${
        gridCols === 4 ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 
        gridCols === 2 ? 'grid-cols-2' : 'max-w-2xl mx-auto'
      } gap-4 sm:gap-6 md:gap-8 mb-16`}>
        {sortedProducts.length === 0 ? (
          <div className="col-span-full py-20 text-center font-mono-custom text-xs sm:text-sm text-neutral-500 uppercase tracking-widest">
            [ NO PRODUCTS FOUND IN THIS CATEGORY ]
          </div>
        ) : (
          sortedProducts.map((product, index) => {
            const isWishlisted = wishlist.includes(product.id);
            const displayId = index < 9 ? `0${index + 1}` : `${index + 1}`;
            return (
              <Link 
                key={product.id} 
                href={`/shop/${product.slug}`}
                className="flex flex-col group cursor-pointer"
              >
                
                {/* Product Card Image Wrapper */}
                <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] bg-neutral-900 overflow-hidden border border-black/20 mb-2 sm:mb-3">
                  
                  {/* Number Tag Upar Left */}
                  <div className="absolute top-3 left-3 z-10 font-mono-custom text-[10px] sm:text-xs text-white bg-black/60 px-2 py-0.5 tracking-widest">
                    [ {displayId} ]
                  </div>

                  {/* Wishlist Heart Icon Upar Right */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 z-10 text-white hover:text-[#ED3833] transition-colors p-1.5"
                  >
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-[#ED3833] text-[#ED3833]' : 'fill-transparent stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  {/* Product Media */}
                  <video 
                    src={product.image} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Quick Add Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <span className="font-mono-custom text-[9px] sm:text-[10px] tracking-widest text-white uppercase border border-white/30 px-3 py-1">
                      QUICK VIEW +
                    </span>
                  </div>
                </div>

                {/* Product Details Bar */}
                <div className="flex items-start justify-between font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest pt-1 border-t border-black/10">
                  <div>
                    <div className="font-bold text-black group-hover:text-[#ED3833] transition-colors">{product.name}</div>
                    <div className="text-neutral-600 mt-0.5">{product.price}</div>
                  </div>
                  <span className="font-bold hover:text-[#ED3833] transition-colors pt-0.5">
                    + VIEW
                  </span>
                </div>

              </Link>
            );
          })
        )}
      </div>

    </main>
  );
}