'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProducts, Product } from '@/data/products';

export default function GlobalProductPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'architecture-trousers';
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("BLACK");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // Independent Accordion States (01 open by default, 02 & 03 closed)
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({ 1: true, 2: false, 3: false });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    const allProducts = getProducts();
    const currProduct = allProducts[slug] || allProducts['architecture-trousers'];
    if (currProduct) {
      setProduct(currProduct);
      setSelectedSize(currProduct.sizes[0] || "S");
      setSelectedColor(currProduct.colors[0]?.name || "BLACK");
    }
  }, [slug]);

  if (!product) return <div className="min-h-screen bg-[#FFF9F7] pt-32 px-6 font-mono-custom">[ LOADING PRODUCT... ]</div>;

  const handleWhatsAppQuote = () => {
    const phoneNumber = "919876543210"; // Client ka actual WhatsApp number
    const message = `Hello, I want a custom quotation for *${product.title}* (${product.price}).\nSize: ${selectedSize}\nColor: ${selectedColor}\nPlease share availability and details.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      alert("[ SORRY, THIS ITEM IS CURRENTLY OUT OF STOCK. ]");
      return;
    }
    setCartCount(prev => prev + 1);
    
    // Save to localStorage cart if needed across pages
    const existingCart = JSON.parse(localStorage.getItem('urbn_cart') || '[]');
    existingCart.push({ title: product.title, price: product.price, size: selectedSize, color: selectedColor });
    localStorage.setItem('urbn_cart', JSON.stringify(existingCart));

    alert(`[ SUCCESS: ADDED ${product.title} (SIZE: ${selectedSize}, COLOR: ${selectedColor}) TO BAG ]`);
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom selection:bg-black selection:text-white pt-24 md:pt-32 overflow-x-hidden">
      
      {/* Breadcrumbs with Gen Z Brackets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
        <Link href="/" className="hover:text-black transition-colors">[ HOME ]</Link> / <Link href="/shop" className="hover:text-black transition-colors">[ SHOP ]</Link> / <span className="text-black font-bold break-all">[ {product.title} ]</span>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pb-16">
        
        {/* Left: Gallery with Fully Working Arrows */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 no-scrollbar">
            {product.images && product.images.length > 0 ? (
              product.images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 border-2 transition-all cursor-pointer overflow-hidden bg-neutral-200 hover:scale-105 ${
                    selectedImage === idx ? 'border-black scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center text-[10px] font-bold">
                    [ IMG {idx + 1} ]
                  </div>
                </button>
              ))
            ) : (
              <div className="text-xs text-neutral-500">[ NO IMAGES ]</div>
            )}
          </div>

          <div className="relative flex-1 bg-neutral-200 aspect-[3/4] overflow-hidden border border-black/10 w-full group">
            <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm tracking-widest text-neutral-600 font-bold bg-[#DFDBD2]">
              [ VIEW: {selectedImage + 1} OF 04 ]
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-black/90 text-white px-3 py-1.5 text-xs tracking-widest shadow-lg z-20">
              <span>[ 0{selectedImage + 1}/04 ]</span>
              <button 
                onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : 3))} 
                className="hover:text-[#ED3833] cursor-pointer transition-colors p-1"
                aria-label="Previous Image"
              >
                &larr;
              </button>
              <button 
                onClick={() => setSelectedImage((prev) => (prev < 3 ? prev + 1 : 0))} 
                className="hover:text-[#ED3833] cursor-pointer transition-colors p-1"
                aria-label="Next Image"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6 w-full overflow-hidden">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#ED3833] font-bold">[ {product.issue || 'ISSUE 01'} ]</span>
            <h1 className="font-thunder text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase font-extrabold mt-1 break-words leading-none">
              {product.title}
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-3 leading-relaxed">
              {product.description || "Structure meets street. Designed for movement, built for the now."}
            </p>
          </div>

          <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
            <span className="font-thunder text-3xl sm:text-4xl font-bold tracking-wider">{product.price}</span>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></span>
              <span className="font-bold">[ {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'} ]</span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs uppercase tracking-widest">
              <span className="font-bold">[ SELECT SIZE ]</span>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="underline text-neutral-600 hover:text-black cursor-pointer font-bold transition-colors"
              >
                [ SIZE GUIDE → ]
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes && product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs font-mono-custom tracking-widest uppercase border transition-all cursor-pointer hover:border-black ${
                    selectedSize === size ? 'bg-black text-white border-black font-bold shadow-sm' : 'bg-transparent border-black/30 text-neutral-800'
                  }`}
                >
                  [ {size} ]
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection (Padded & aligned properly with dynamic color balls) */}
          <div className="space-y-2 py-2 px-1">
            <span className="text-xs uppercase tracking-widest font-bold">[ SELECT COLOR: <span className="text-neutral-600 font-normal">{selectedColor}</span> ]</span>
            <div className="flex flex-wrap gap-3 pt-2">
              {product.colors && product.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer shadow-xs ${selectedColor === col.name ? 'border-black scale-110 ring-2 ring-black/20' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                  aria-label={col.name}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons (Fully Working Add to Cart & Heart Wishlist) */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all text-center shadow-sm ${
                  product.inStock ? 'bg-black text-white hover:bg-[#ED3833] hover:scale-[1.01] cursor-pointer' : 'bg-neutral-400 text-neutral-700 cursor-not-allowed'
                }`}
              >
                {product.inStock ? '[ ADD TO CART → ]' : '[ OUT OF STOCK ]'}
              </button>
              <button 
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  alert(isWishlisted ? "[ REMOVED FROM WISHLIST ]" : "[ ADDED TO WISHLIST ]");
                }}
                className={`w-14 border border-black flex items-center justify-center transition-all cursor-pointer ${isWishlisted ? 'bg-black text-white' : 'hover:bg-black/5 hover:scale-105'}`}
                aria-label="Wishlist"
              >
                <svg className={`w-5 h-5 ${isWishlisted ? 'fill-[#ED3833] stroke-[#ED3833]' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            <button 
              onClick={handleWhatsAppQuote}
              className="w-full bg-[#25D366] text-black hover:bg-[#20ba5a] hover:scale-[1.01] py-3.5 text-xs uppercase tracking-[0.15em] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.15-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              [ GET CUSTOM QUOTE ON WHATSAPP ]
            </button>
          </div>

          {/* Fully Working Independent Accordions (+ / − Toggles for Details, Care, Delivery) */}
          <div className="border-t border-black/10 divide-y divide-black/10 pt-4">
            
            {/* 01. Details */}
            <div className="py-3">
              <button 
                onClick={() => toggleAccordion(1)} 
                className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold cursor-pointer hover:text-[#ED3833] transition-colors"
              >
                <span>[ 01. DETAILS ]</span>
                <span className="text-lg font-mono">{openAccordions[1] ? '−' : '+'}</span>
              </button>
              {openAccordions[1] && (
                <p className="text-xs text-neutral-600 mt-2 uppercase tracking-wider leading-relaxed animate-in fade-in duration-200">
                  {product.details || "Wide-leg silhouette with architectural folds. Premium fabric. Minimal design. Maximum presence."}
                </p>
              )}
            </div>

            {/* 02. Care */}
            <div className="py-3">
              <button 
                onClick={() => toggleAccordion(2)} 
                className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold cursor-pointer hover:text-[#ED3833] transition-colors"
              >
                <span>[ 02. CARE ]</span>
                <span className="text-lg font-mono">{openAccordions[2] ? '−' : '+'}</span>
              </button>
              {openAccordions[2] && (
                <p className="text-xs text-neutral-600 mt-2 uppercase tracking-wider leading-relaxed animate-in fade-in duration-200">
                  {product.care || "Dry clean only. Do not bleach. Cool iron on reverse if necessary."}
                </p>
              )}
            </div>

            {/* 03. Delivery */}
            <div className="py-3">
              <button 
                onClick={() => toggleAccordion(3)} 
                className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold cursor-pointer hover:text-[#ED3833] transition-colors"
              >
                <span>[ 03. DELIVERY ]</span>
                <span className="text-lg font-mono">{openAccordions[3] ? '−' : '+'}</span>
              </button>
              {openAccordions[3] && (
                <p className="text-xs text-neutral-600 mt-2 uppercase tracking-wider leading-relaxed animate-in fade-in duration-200">
                  {product.delivery || "Ships in 1–2 business days. Express pan-India shipping available at checkout."}
                </p>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Dedicated Bottom Empty Space Spacer Div for Mobile Overlap Prevention */}
      <div className="w-full h-44 sm:h-56 pointer-events-none" aria-hidden="true" />

      {/* Size Guide Slide-Over Drawer from Right */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#FFF9F7] h-full p-6 sm:p-8 flex flex-col shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b border-black/20 pb-4 mb-6">
              <h3 className="font-thunder text-2xl font-black uppercase tracking-wider">[ SIZE GUIDE ]</h3>
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-xl font-bold hover:text-[#ED3833] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 font-mono-custom text-xs uppercase tracking-wider text-neutral-700 leading-relaxed">
              <p>Find your precise measurements below for the perfect oversized architectural fit.</p>
              <div className="border border-black/20 p-4 space-y-2 bg-white shadow-xs">
                <div className="flex justify-between border-b pb-1 font-bold"><span>Size</span><span>Chest / Waist</span></div>
                <div className="flex justify-between"><span>XS</span><span>36" / 28"</span></div>
                <div className="flex justify-between"><span>S</span><span>38" / 30"</span></div>
                <div className="flex justify-between"><span>M</span><span>40" / 32"</span></div>
                <div className="flex justify-between"><span>L</span><span>42" / 34"</span></div>
                <div className="flex justify-between"><span>XL</span><span>44" / 36"</span></div>
              </div>
              <p className="text-[10px] text-neutral-500">[ NOTE: ALL MEASUREMENTS ARE IN INCHES. MODEL IS WEARING SIZE M. ]</p>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}