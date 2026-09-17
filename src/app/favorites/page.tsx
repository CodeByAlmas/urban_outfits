'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const recommendedProducts = [
  { 
    id: "01", 
    name: "TECHWEAR JACKET", 
    price: "₹ 4,990", 
    category: "OUTERWEAR", 
    season: "FW'24", 
    badge: "NEW ARRIVAL",
    image: "/film-video.mp4" 
  },
  { 
    id: "02", 
    name: "CUTOUT TOP", 
    price: "₹ 2,490", 
    category: "TOPS", 
    season: "SS'25", 
    badge: "BEST SELLER",
    image: "/film-video.mp4" 
  },
  { 
    id: "03", 
    name: "URBN SNEAKERS", 
    price: "₹ 5,990", 
    category: "FOOTWEAR", 
    season: "SS'25", 
    badge: "LIMITED EDITION",
    image: "/film-video.mp4" 
  },
];

export default function FavoritesPage() {
  const [favoritesList, setFavoritesList] = useState<any[]>([]);

  // Load favorites from localStorage on mount and listen for real-time updates across pages
  useEffect(() => {
    const fetchFavorites = () => {
      try {
        const stored = localStorage.getItem('urbn_favorites');
        if (stored) {
          setFavoritesList(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    };

    fetchFavorites();

    // Custom event listener so other pages can sync favorites instantly
    window.addEventListener('storage', fetchFavorites);
    window.addEventListener('urbn_favorites_updated', fetchFavorites);

    return () => {
      window.removeEventListener('storage', fetchFavorites);
      window.removeEventListener('urbn_favorites_updated', fetchFavorites);
    };
  }, []);

  // Function to remove or toggle item from favorites directly from this page
  const removeFromFavorites = (id: string) => {
    const updated = favoritesList.filter(item => item.id !== id);
    setFavoritesList(updated);
    localStorage.setItem('urbn_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('urbn_favorites_updated'));
  };

  // Function to add a recommended product into favorites from the right column
  const toggleRecommendedFavorite = (product: any) => {
    const exists = favoritesList.some(item => item.id === product.id);
    let updated;
    if (exists) {
      updated = favoritesList.filter(item => item.id !== product.id);
    } else {
      updated = [...favoritesList, product];
    }
    setFavoritesList(updated);
    localStorage.setItem('urbn_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('urbn_favorites_updated'));
  };

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-28 pb-12 px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Top Section Tag */}
      <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase mb-4">
        [ FAVORITES ]
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Favorites Grid or Empty State */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4 whitespace-nowrap">
              YOUR FAVORITES
            </h1>
            <p className="font-mono-custom text-xs uppercase tracking-[0.2em] text-neutral-600 mb-8">
              SAVED TODAY. FOR LATER. ({favoritesList.length} ITEMS)
            </p>
          </div>

          {favoritesList.length === 0 ? (
            /* Center Box with Foil Bag Graphic & Empty Message */
            <div className="relative w-full max-w-[500px] border border-black/20 p-8 sm:p-12 flex flex-col items-center justify-center text-center my-6 bg-[#FFF9F7] shadow-sm">
              
              {/* Corner Cross-hairs (+) */}
              <span className="absolute -top-3 -left-3 text-black font-mono text-sm font-bold">+</span>
              <span className="absolute -top-3 -right-3 text-black font-mono text-sm font-bold">+</span>
              <span className="absolute -bottom-3 -left-3 text-black font-mono text-sm font-bold">+</span>
              <span className="absolute -bottom-3 -right-3 text-black font-mono text-sm font-bold">+</span>

              {/* Foil Bag Visual Simulation */}
              <div className="relative w-48 sm:w-56 h-56 sm:h-64 mb-6 bg-neutral-200 border border-black/30 overflow-hidden shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
                <div className="relative z-10 font-thunder text-3xl font-black uppercase tracking-widest bg-black text-white px-4 py-2 border border-red-600">
                  URBN<span className="text-[#ED3833]">™</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/20 pointer-events-none"></div>
              </div>

              {/* Empty State Text */}
              <h3 className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 text-black">
                ADD YOUR FAVORITES HERE.
              </h3>
              <p className="font-mono-custom text-[11px] uppercase tracking-wider text-neutral-500 max-w-xs mb-6 leading-relaxed">
                YOUR MOST STYLISH FINDS WILL BE HERE. SAVE THEM SO YOU DON'T LOSE THEM.
              </p>

              {/* Explore Collections Button */}
              <Link 
                href="/shop"
                className="w-full sm:w-auto bg-black text-white font-mono-custom text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#ED3833] transition-colors flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>EXPLORE COLLECTIONS</span>
                <span>→</span>
              </Link>
            </div>
          ) : (
            /* Populated Favorites Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
              {favoritesList.map((product) => (
                <div key={product.id} className="flex flex-col border border-black/15 bg-[#FFF9F7] p-3 relative group">
                  <div className="relative w-full h-72 bg-neutral-900 overflow-hidden border border-black/20 mb-3">
                    <div className="absolute top-2 left-2 z-10 font-mono-custom text-[10px] text-white bg-black/60 px-1.5 py-0.5 tracking-widest">
                      [ {product.id} ]
                    </div>
                    
                    {/* Remove from Favorites Button */}
                    <button 
                      onClick={() => removeFromFavorites(product.id)}
                      className="absolute top-2 right-2 z-10 text-[#ED3833] bg-black/60 hover:bg-black p-1.5 transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>

                    <video 
                      src={product.image || "/film-video.mp4"} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="font-mono-custom text-xs uppercase tracking-widest flex flex-col justify-between flex-1">
                    <div>
                      <div className="font-bold text-black truncate mb-1">{product.name}</div>
                      <div className="font-bold text-[#ED3833] mb-2">{product.price}</div>
                      <div className="text-[10px] text-neutral-500">{product.category} {product.season ? `// ${product.season}` : ''}</div>
                    </div>
                    <button 
                      onClick={() => removeFromFavorites(product.id)}
                      className="mt-4 w-full bg-black text-white hover:bg-[#ED3833] py-2 text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Decorative handwritten text vibe */}
          <div className="hidden sm:block font-serif italic text-neutral-400 text-lg rotate-[-4deg] mt-4">
            "Good taste lives here."
          </div>
        </div>

        {/* Right Column: YOU MAY ALSO LIKE Recommendations */}
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-black/15 pt-8 lg:pt-0 lg:pl-8">
          
          <div className="flex items-center justify-between border-b border-black/15 pb-4 mb-6 font-mono-custom text-xs uppercase tracking-widest">
            <span className="font-bold text-black">YOU MAY ALSO LIKE</span>
            <span className="text-neutral-500">[ HANDPICKED FOR YOU ]</span>
          </div>

          {/* Recommendation Product List */}
          <div className="flex flex-col gap-6">
            {recommendedProducts.map((item) => {
              const isFav = favoritesList.some(fav => fav.id === item.id);
              return (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b border-black/10 pb-6 group">
                  
                  {/* Product Image / Video Box */}
                  <div className="relative w-full sm:w-36 h-44 bg-neutral-900 overflow-hidden border border-black/20 flex-shrink-0">
                    <div className="absolute top-2 left-2 z-10 font-mono-custom text-[10px] text-white bg-black/60 px-1.5 py-0.5 tracking-widest">
                      [ {item.id} ]
                    </div>
                    
                    {/* Wishlist Heart Icon */}
                    <button 
                      onClick={() => toggleRecommendedFavorite(item)}
                      className="absolute top-2 right-2 z-10 text-white hover:text-[#ED3833] transition-colors p-1 cursor-pointer"
                    >
                      <svg className={`w-4 h-4 ${isFav ? 'fill-[#ED3833] text-[#ED3833]' : 'fill-transparent stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>

                    <video 
                      src={item.image} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-between flex-1 font-mono-custom text-xs uppercase tracking-widest py-1">
                    <div>
                      <div className="font-bold text-black group-hover:text-[#ED3833] transition-colors text-sm mb-1">
                        {item.name}
                      </div>
                      <div className="font-bold text-black mb-2">{item.price}</div>
                      
                      <div className="text-[10px] text-neutral-500 leading-relaxed">
                        {item.category}<br />
                        {item.season}<br />
                        {item.badge}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                      <button 
                        onClick={() => toggleRecommendedFavorite(item)}
                        className="font-bold text-black hover:text-[#ED3833] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {isFav ? 'REMOVE FAVORITE' : 'ADD TO FAVORITES'} <span>→</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </main>
  );
}