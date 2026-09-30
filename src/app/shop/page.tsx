'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getProductsFromSupabase, Product } from '@/data/products';

const categories = ["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "SETS", "ACCESSORIES", "FOOTWEAR", "LIMITED EDITION", "SALE"];
const sizesList = ["ALL", "S", "M", "L", "XL", "28", "30", "32", "34", "ONE SIZE"];
const sortOptions = ["BEST SELLING", "PRICE: LOW TO HIGH", "PRICE: HIGH TO LOW", "NEWEST"];

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSubCategory, setSelectedSubCategory] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("BEST SELLING");
  
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [gridCols, setGridCols] = useState<4 | 2 | 1>(4);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    getProductsFromSupabase().then(data => {
      setProductsList(Object.values(data));
    });
  }, []);

  // Sync category from URL search params if coming from CategoriesSection
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory.toUpperCase());
      setSelectedSubCategory("ALL"); // reset sub-category on category change
    }
  }, [urlCategory]);

  const toggleWishlist = (slug: string) => {
    setWishlist(prev => 
      prev.includes(slug) ? prev.filter(item => item !== slug) : [...prev, slug]
    );
  };

  // 1. Filter by Category
  let filtered = selectedCategory === "ALL" 
    ? productsList 
    : productsList.filter(p => p.category?.toUpperCase() === selectedCategory);

  // Extract available sub-categories for the currently selected category
  const availableSubCategories = Array.from(
    new Set(
      filtered
        .map(p => p.subCategory?.trim().toUpperCase())
        .filter(Boolean)
    )
  );

  // 2. Filter by Sub-Category
  if (selectedSubCategory !== "ALL") {
    filtered = filtered.filter(p => p.subCategory?.toUpperCase() === selectedSubCategory);
  }

  // 3. Filter by Size
  if (selectedSize !== "ALL") {
    filtered = filtered.filter(p => {
      if (Array.isArray(p.sizes)) {
        return p.sizes.includes(selectedSize);
      } else if (p.sizes && typeof p.sizes === 'object') {
        return Object.keys(p.sizes).includes(selectedSize);
      }
      return false;
    });
  }

  // 4. Sort Logic
  const sortedProducts = [...filtered].sort((a, b) => {
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
          <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none break-words">
            {selectedCategory === "ALL" ? "ALL PRODUCTS" : selectedCategory}
          </h1>
        </div>

        <div className="flex flex-row sm:flex-col lg:flex-row items-start sm:items-end justify-between lg:items-end gap-4 sm:gap-8">
          <div className="font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest text-neutral-600">
            [ {sortedProducts.length < 10 ? `0${sortedProducts.length}` : sortedProducts.length} -ITEMS ]
          </div>
        </div>
      </div>

      {/* Filter & Toolbar Row */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between border-b border-black/15 pb-6 mb-8 sm:mb-10 gap-6 relative">
        <div className="w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 flex items-center gap-2 md:gap-3 font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubCategory("ALL");
                }}
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

        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 sm:gap-6 font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest w-full xl:w-auto xl:justify-end relative">
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

          <div className="hidden sm:flex items-center gap-2 text-neutral-500 pl-4 border-l border-black/20">
            <button onClick={() => setGridCols(4)} className={`cursor-pointer ${gridCols === 4 ? 'text-black font-bold' : ''}`}>■■■</button>
            <button onClick={() => setGridCols(2)} className={`cursor-pointer ${gridCols === 2 ? 'text-black font-bold' : ''}`}>■■</button>
            <button onClick={() => setGridCols(1)} className={`cursor-pointer ${gridCols === 1 ? 'text-black font-bold' : ''}`}>■</button>
          </div>
        </div>
      </div>

      {/* Dynamic Sub-Category Filter Bar (Appears only if sub-categories exist for selected category) */}
      {availableSubCategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 font-mono-custom text-[10px] sm:text-xs uppercase tracking-widest no-scrollbar border-b border-black/10">
          <span className="text-neutral-500 font-bold mr-2">SUB-CATEGORY:</span>
          <button
            onClick={() => setSelectedSubCategory("ALL")}
            className={`px-3 py-1 cursor-pointer transition-colors border ${
              selectedSubCategory === "ALL" ? 'bg-black text-white border-black font-bold' : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
            }`}
          >
            ALL
          </button>
          {availableSubCategories.map(subCat => (
            <button
              key={subCat}
              onClick={() => setSelectedSubCategory(subCat)}
              className={`px-3 py-1 cursor-pointer transition-colors border whitespace-nowrap ${
                selectedSubCategory === subCat ? 'bg-black text-white border-black font-bold' : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
              }`}
            >
              {subCat}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className={`grid grid-cols-1 ${
        gridCols === 4 ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 
        gridCols === 2 ? 'grid-cols-2' : 'max-w-2xl mx-auto'
      } gap-4 sm:gap-6 md:gap-8 mb-16`}>
        {sortedProducts.length === 0 ? (
          <div className="col-span-full py-20 text-center font-mono-custom text-xs sm:text-sm text-neutral-500 uppercase tracking-widest">
            [ NO PRODUCTS FOUND IN THIS CATEGORY. ]
          </div>
        ) : (
          sortedProducts.map((product, index) => {
            const isWishlisted = wishlist.includes(product.slug);
            const displayId = index < 9 ? `0${index + 1}` : `${index + 1}`;
            
            // Auto fallback image resolution from general images or color variant images
            const fallbackImg = product.images?.[0] || 
              (product.colors?.[0]?.images?.[0]) || 
              "/placeholder-1.jpg";

            return (
              <Link 
                key={product.slug} 
                href={`/shop/${product.slug}`}
                className="flex flex-col group cursor-pointer"
              >
                <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] bg-neutral-900 overflow-hidden border border-black/20 mb-2 sm:mb-3">
                  <div className="absolute top-3 left-3 z-10 font-mono-custom text-[10px] sm:text-xs text-white bg-black/60 px-2 py-0.5 tracking-widest">
                    [ {displayId} ]
                  </div>
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.slug); }}
                    className="absolute top-3 right-3 z-10 text-white hover:text-[#ED3833] transition-colors p-1.5"
                  >
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-[#ED3833] text-[#ED3833]' : 'fill-transparent stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                  <img 
                    src={fallbackImg} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="flex items-start justify-between font-mono-custom text-[11px] sm:text-xs uppercase tracking-widest pt-1 border-t border-black/10">
                  <div>
                    <div className="font-bold text-black group-hover:text-[#ED3833] transition-colors">{product.title}</div>
                    <div className="text-neutral-600 mt-0.5">{product.price}</div>
                    {product.subCategory && <div className="text-[9px] text-[#ED3833] mt-0.5">↳ {product.subCategory}</div>}
                  </div>
                  <span className="font-bold text-black group-hover:text-[#ED3833] transition-colors pt-0.5">
                    + VIEW
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Mobile-Only Bottom Spacer to prevent footer overlap */}
      <div className="block sm:hidden w-full h-64 pointer-events-none" aria-hidden="true" />

    </main>
  );
}

export default function ShopAllPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9F7] flex items-center justify-center font-mono-custom text-xs uppercase tracking-widest">[ LOADING SHOP... ]</div>}>
      <ShopContent />
    </Suspense>
  );
}