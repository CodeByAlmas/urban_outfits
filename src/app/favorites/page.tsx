'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProductsFromSupabase, Product } from '@/data/products';

export default function FavoritesPage() {
  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('urbn_favorites');
      if (stored) {
        setFavoritesList(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }

    getProductsFromSupabase().then(data => {
      const allProds = Object.values(data);
      setRecommendedProducts(allProds);
    });
  }, []);

  const handleRemove = (keyToはん: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const updated = favoritesList.filter(item => {
      const currentKey = item.slug || item.id;
      return currentKey !== keyToはん;
    });

    setFavoritesList(updated);
    try {
      localStorage.setItem('urbn_favorites', JSON.stringify(updated));
      window.dispatchEvent(new Event('urbn_favorites_updated'));
    } catch (err) {
      console.error("Error saving favorites", err);
    }
  };

  const toggleRecommendedFavorite = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const prodKey = product.slug || product.id;
    const exists = favoritesList.some(item => (item.slug || item.id) === prodKey);
    let updated;
    if (exists) {
      updated = favoritesList.filter(item => (item.slug || item.id) !== prodKey);
    } else {
      updated = [...favoritesList, product];
    }
    setFavoritesList(updated);
    try {
      localStorage.setItem('urbn_favorites', JSON.stringify(updated));
      window.dispatchEvent(new Event('urbn_favorites_updated'));
    } catch (err) {}
  };

  const filteredRecommendations = recommendedProducts.filter(item => {
    const prodKey = item.slug;
    return !favoritesList.some(fav => (fav.slug || fav.id) === prodKey);
  }).slice(0, 3);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-28 pb-12 px-6 md:px-12 select-none overflow-x-hidden">
      
      <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase mb-4">
        [ FAVORITES ]
      </div>

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
            <div className="relative w-full max-w-[500px] border border-black/20 p-8 sm:p-12 flex flex-col items-center justify-center text-center my-6 bg-[#FFF9F7] shadow-sm">
              <span className="absolute -top-3 -left-3 text-black font-mono text-sm font-bold">+</span>
              <span className="absolute -top-3 -right-3 text-black font-mono text-sm font-bold">+</span>
              <span className="absolute -bottom-3 -left-3 text-black font-mono text-sm font-bold">+</span>
              <span className="absolute -bottom-3 -right-3 text-black font-mono text-sm font-bold">+</span>

              <div className="relative w-48 sm:w-56 h-56 sm:h-64 mb-6 bg-neutral-200 border border-black/30 overflow-hidden shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
                <div className="relative z-10 font-thunder text-3xl font-black uppercase tracking-widest bg-black text-white px-4 py-2 border border-red-600">
                  URBN<span className="text-[#ED3833]">™</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/20 pointer-events-none"></div>
              </div>

              <h3 className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 text-black">
                ADD YOUR FAVORITES HERE.
              </h3>
              <p className="font-mono-custom text-[11px] uppercase tracking-wider text-neutral-500 max-w-xs mb-6 leading-relaxed">
                YOUR MOST STYLISH FINDS WILL BE HERE. SAVE THEM SO YOU DON'T LOSE THEM.
              </p>

              <Link 
                href="/collections"
                className="inline-block bg-black text-white font-mono-custom text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#ED3833] transition-colors cursor-pointer"
              >
                EXPLORE COLLECTIONS →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
              {favoritesList.map((product) => {
                const prodKey = product.slug || product.id;
                const displayImg = product.images?.[0] || product.image || "/placeholder-1.jpg";
                return (
                  <div key={prodKey} className="flex flex-col border border-black/15 bg-[#FFF9F7] p-3 relative group">
                    <div className="relative w-full h-72 bg-neutral-900 overflow-hidden border border-black/20 mb-3">
                      <Link href={`/shop/${prodKey}`} className="absolute inset-0 block z-10">
                        <img 
                          src={displayImg} 
                          alt={product.title || product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <button 
                        type="button"
                        onClick={(e) => handleRemove(prodKey, e)}
                        className="absolute top-2 right-2 z-20 text-[#ED3833] bg-black/80 hover:bg-black p-2 transition-colors cursor-pointer"
                        title="Remove from favorites"
                      >
                        <svg className="w-4 h-4 fill-current pointer-events-none" viewBox="0 0 24 24">
                          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                    </div>

                    <div className="font-mono-custom text-xs uppercase tracking-widest flex flex-col justify-between flex-1">
                      <div>
                        <Link href={`/shop/${prodKey}`} className="font-bold text-black truncate mb-1 block hover:text-[#ED3833] transition-colors">
                          {product.title || product.name}
                        </Link>
                        <div className="font-bold text-[#ED3833] mb-2">{product.price}</div>
                        <div className="text-[10px] text-neutral-500">{product.category} {product.subCategory ? `// ${product.subCategory}` : ''}</div>
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => handleRemove(prodKey, e)}
                        className="mt-4 w-full bg-black text-white hover:bg-[#ED3833] py-2.5 text-[10px] uppercase tracking-widest transition-colors cursor-pointer z-20 relative"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="hidden sm:block font-serif italic text-neutral-400 text-lg rotate-[-4deg] mt-4">
            "Good taste lives here."
          </div>
        </div>

        {/* Right Column: Dynamic Recommendations from Supabase */}
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-black/15 pt-8 lg:pt-0 lg:pl-8">
          
          <div className="flex items-center justify-between border-b border-black/15 pb-4 mb-6 font-mono-custom text-xs uppercase tracking-widest">
            <span className="font-bold text-black">YOU MAY ALSO LIKE</span>
            <span className="text-neutral-500">[ HANDPICKED FOR YOU ]</span>
          </div>

          <div className="flex flex-col gap-6">
            {filteredRecommendations.length === 0 ? (
              <p className="text-xs font-mono uppercase text-neutral-500">[ NO MORE RECOMMENDATIONS ]</p>
            ) : (
              filteredRecommendations.map((item) => {
                const prodKey = item.slug;
                const isFav = favoritesList.some(fav => (fav.slug || fav.id) === prodKey);
                const recImg = item.images?.[0] || "/placeholder-1.jpg";

                return (
                  <div key={prodKey} className="flex flex-col sm:flex-row gap-4 border-b border-black/10 pb-6 group">
                    <div className="relative w-full sm:w-36 h-44 bg-neutral-900 overflow-hidden border border-black/20 flex-shrink-0">
                      <Link href={`/shop/${prodKey}`} className="absolute inset-0 block z-10">
                        <img 
                          src={recImg} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <button 
                        type="button"
                        onClick={(e) => toggleRecommendedFavorite(item, e)}
                        className="absolute top-2 right-2 z-20 text-white hover:text-[#ED3833] transition-colors p-1 cursor-pointer"
                      >
                        <svg className={`w-4 h-4 pointer-events-none ${isFav ? 'fill-[#ED3833] text-[#ED3833]' : 'fill-transparent stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-col justify-between flex-1 font-mono-custom text-xs uppercase tracking-widest py-1">
                      <div>
                        <Link href={`/shop/${prodKey}`} className="font-bold text-black group-hover:text-[#ED3833] transition-colors text-sm mb-1 block">
                          {item.title}
                        </Link>
                        <div className="font-bold text-black mb-2">{item.price}</div>
                        <div className="text-[10px] text-neutral-500 leading-relaxed">
                          {item.category}<br />
                          {item.subCategory || 'GENERAL'}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                        <button 
                          type="button"
                          onClick={(e) => toggleRecommendedFavorite(item, e)}
                          className="font-bold text-black hover:text-[#ED3833] transition-colors flex items-center gap-1 cursor-pointer z-20 relative"
                        >
                          {isFav ? 'REMOVE FAVORITE' : 'ADD TO FAVORITES'} <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

      {/* Desktop-Only Bottom Spacer to prevent footer overlap */}
      <div className="hidden md:block w-full h-34 pointer-events-none" aria-hidden="true" />

    </main>
  );
}