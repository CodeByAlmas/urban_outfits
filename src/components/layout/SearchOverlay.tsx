'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Sample search results matching reference layout
const searchProducts = [
  { id: "01", name: "V-NECK TOP IN NAVY BLUE", price: 3490, category: "TOPS", badge: "NEW SEASON", image: "/film-video.mp4" },
  { id: "02", name: "SLIMMING BODYSUIT IN BLACK", price: 4290, category: "TOPS", badge: "MOST LOVED", image: "/film-video.mp4" },
  { id: "03", name: "DRAPED CORSET WITH FANCY PRINT", price: "3,990", category: "TOPS", badge: "", image: "/film-video.mp4" },
  { id: "04", name: "LONG SLEEPDRESS", price: 5190, category: "SETS", badge: "TIMELESS PIECE", image: "/film-video.mp4" },
  { id: "05", name: "CORSET BODY IN FREEDOM BLUE", price: 4490, category: "LIMITED EDITION", badge: "", image: "/film-video.mp4" },
];

const categories = [
  { id: "01", name: "ALL" },
  { id: "02", name: "TOPS" },
  { id: "03", name: "BOTTOMS" },
  { id: "04", name: "OUTERWEAR" },
  { id: "05", name: "SETS" },
  { id: "06", name: "ACCESSORIES" },
  { id: "07", name: "FOOTWEAR" },
  { id: "08", name: "LIMITED EDITION" },
  { id: "09", name: "SALE" },
];

const sortOptions = ["RELEVANCE", "PRICE: LOW TO HIGH", "PRICE: HIGH TO LOW", "NAME"];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("RELEVANCE");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 2 | 1>(3);
  const [wishlist, setWishlist] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter Logic
  const filtered = searchProducts.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  // Sort Logic
  const sortedProducts = [...filtered].sort((a, b) => {
    const priceA = typeof a.price === 'number' ? a.price : parseInt(a.price.replace(/[^\d]/g, ''));
    const priceB = typeof b.price === 'number' ? b.price : parseInt(b.price.replace(/[^\d]/g, ''));

    if (selectedSort === "PRICE: LOW TO HIGH") return priceA - priceB;
    if (selectedSort === "PRICE: HIGH TO LOW") return priceB - priceA;
    if (selectedSort === "NAME") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#FFF9F7] flex flex-col overflow-y-auto animate-in slide-in-from-top duration-500">
      
      <div className="w-full bg-black text-white px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-50">
        
        {/* Seamless Search Input Box with reduced elegant font size */}
        <div className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH"
            autoFocus
            className="w-full bg-transparent text-white font-thunder text-2xl sm:text-4xl font-black uppercase tracking-wider outline-none placeholder:text-white"
          />
        </div>

        {/* Close Button (White line removed) */}
        <button 
          onClick={onClose}
          className="text-white hover:text-[#ED3833] transition-colors font-mono-custom text-2xl p-2 cursor-pointer ml-4 flex-shrink-0 z-20"
        >
          ✕
        </button>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 px-6 md:px-12 py-10">
        
        {/* Results Counter & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-black/15 pb-4 mb-8 font-mono-custom text-xs uppercase tracking-widest gap-4">
          <div>[ SEARCH RESULTS ] — {sortedProducts.length} RESULTS</div>
          
          <div className="flex items-center gap-6 relative">
            {/* Sort By Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <span className="text-neutral-500">SORT BY :</span>
                <span className="font-bold black hover:text-[#ED3833]">{selectedSort} ▾</span>
              </button>

              {isSortOpen && (
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-48 sm:w-52 bg-[#FFF9F7] border border-black/20 shadow-xl z-50 py-2 flex flex-col">
                  {sortOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSelectedSort(opt); setIsSortOpen(false); }}
                      className={`px-4 py-1.5 text-left hover:bg-[#ED3833] hover:text-white transition-colors ${selectedSort === opt ? 'font-bold text-[#ED3833]' : ''}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid Layout Toggles */}
            <div className="hidden sm:flex items-center gap-2 text-neutral-500 pl-4 border-l border-black/20">
              <button 
                onClick={() => setGridCols(3)}
                className={`cursor-pointer transition-colors ${gridCols === 3 ? 'text-black font-bold' : 'hover:text-black'}`}
                title="3 Column Grid"
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

        {/* Layout Grid: Sidebar Categories + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Sidebar (Popular Products + Numbered Categories) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="font-mono-custom text-xs tracking-widest text-neutral-500 uppercase mb-2">
                [ SEARCH RESULTS ]
              </div>
              <h2 className="font-thunder text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                POPULAR<br />
                PRODUCTS
              </h2>

              {/* Numbered Category List */}
              <div className="flex flex-col space-y-3 font-mono-custom text-xs uppercase tracking-widest">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center gap-3 text-left transition-colors cursor-pointer ${
                        isSelected ? 'text-[#ED3833] font-bold' : 'text-neutral-700 hover:text-black'
                      }`}
                    >
                      <span className="text-neutral-400">[ {cat.id} ]</span>
                      <span className={isSelected ? 'bg-[#ED3833] text-white px-2 py-0.5' : ''}>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Manifesto */}
            <div className="hidden lg:block font-mono-custom text-[11px] uppercase tracking-[0.2em] text-neutral-500 mt-20">
              DIFFERENT<br />
              PEOPLE.<br />
              SAME URBN.
            </div>
          </div>

          {/* Right Product Grid */}
          <div className={`lg:col-span-9 grid grid-cols-1 ${
            gridCols === 3 ? 'sm:grid-cols-2 md:grid-cols-3' : 
            gridCols === 2 ? 'sm:grid-cols-2' : 'max-w-xl mx-auto'
          } gap-6`}>
            {sortedProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center font-mono-custom text-sm text-neutral-500 uppercase tracking-widest">
                [ NO PRODUCTS FOUND MATCHING YOUR SEARCH ]
              </div>
            ) : (
              sortedProducts.log ? null : sortedProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                const displayPrice = typeof product.price === 'number' ? `₹ ${product.price.toLocaleString()}` : `₹ ${product.price}`;
                return (
                  <div key={product.id} className="flex flex-col group cursor-pointer bg-[#FFF9F7]">
                    
                    {/* Image Box */}
                    <div className="relative w-full h-[380px] bg-neutral-900 overflow-hidden border border-black/20 mb-3">
                      <div className="absolute top-3 left-3 z-10 font-mono-custom text-xs text-white bg-black/60 px-2 py-0.5 tracking-widest">
                        [ {product.id} ]
                      </div>

                      {/* Wishlist */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                        className="absolute top-3 right-3 z-10 text-white hover:text-[#ED3833] transition-colors p-1.5"
                      >
                        <svg className={`w-5 h-5 ${isWishlisted ? 'fill-[#ED3833] text-[#ED3833]' : 'fill-transparent stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>

                      {product.badge && (
                        <div className="absolute bottom-3 left-3 font-serif italic text-white text-base drop-shadow-md">
                          {product.badge}
                        </div>
                      )}

                      <video 
                        src={product.image} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Details Bar */}
                    <div className="flex items-start justify-between font-mono-custom text-xs uppercase tracking-widest pt-1 border-t border-black/10">
                      <div>
                        <div className="font-bold text-black group-hover:text-[#ED3833] transition-colors">{product.name}</div>
                        <div className="text-neutral-600 mt-0.5">{displayPrice}</div>
                      </div>
                      <button className="font-bold hover:text-[#ED3833] transition-colors pt-0.5 cursor-pointer">
                        ADD →
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Footer Sub-bar */}
        <div className="w-full flex justify-between items-center font-mono-custom text-[10px] uppercase tracking-widest text-neutral-500 pt-12 mt-12 border-t border-black/15">
          <span>— MORE PRODUCTS</span>
          <span>[ SS '25 ]</span>
        </div>

      </div>

    </div>
  );
}