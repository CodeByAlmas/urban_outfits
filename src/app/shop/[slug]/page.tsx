'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductsFromSupabase, Product } from '@/data/products';

export default function GlobalProductPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  
  const [product, setProduct] = useState<Product | null>(null);
  const [activeGalleryImages, setActiveGalleryImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({ 1: true, 2: false, 3: false });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    getProductsFromSupabase().then(allProducts => {
      const currProduct = allProducts[slug];
      if (currProduct) {
        setProduct(currProduct);
        
        // Find first available size with stock > 0
        const sizesMap = currProduct.sizes || {};
        const availableSizes = Object.entries(sizesMap).filter(([_, qty]) => (qty as number) > 0);
        const defaultSz = availableSizes.length > 0 ? availableSizes[0][0] : (Object.keys(sizesMap)[0] || "S");
        setSelectedSize(defaultSz);
        
        if (currProduct.colors && currProduct.colors.length > 0) {
          const defaultColor = currProduct.colors[0].name || "";
          setSelectedColor(defaultColor);
        } else {
          setSelectedColor("");
        }
        
        const initialImgs = currProduct.colors?.[0]?.images?.length > 0 
          ? currProduct.colors[0].images 
          : (currProduct.images?.length > 0 ? currProduct.images : ['/placeholder-1.jpg']);
        
        setActiveGalleryImages(initialImgs);
        setSelectedImage(0);
      }
    });
  }, [slug]);

  const handleColorSelect = (colorName: string, colorImages?: string[]) => {
    setSelectedColor(colorName);
    if (colorImages && colorImages.length > 0) {
      setActiveGalleryImages(colorImages);
    } else if (product?.images) {
      setActiveGalleryImages(product.images);
    }
    setSelectedImage(0);
  };

  if (!product) return <div className="min-h-screen bg-[#FFF9F7] pt-32 px-6 font-mono-custom">[ LOADING PRODUCT FROM CLOUD... ]</div>;

  const handleWhatsAppQuote = () => {
    const phoneNumber = "7275023613";
    const message = `Hello, I want a quotation for *${product.title}* (${product.price}).\nSize: ${selectedSize}${selectedColor ? `\nColor: ${selectedColor}` : ''}\nPlease share details.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      alert("[ SORRY, THIS ITEM IS CURRENTLY OUT OF STOCK. ]");
      return;
    }
    
    const sizesMap = product.sizes || {};
    const currentQty = sizesMap[selectedSize] ?? 0;
    if (currentQty <= 0) {
      alert(`[ SORRY, SIZE ${selectedSize} IS CURRENTLY SOLD OUT. ]`);
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('urbn_cart') || '[]');
    existingCart.push({ title: product.title, price: product.price, size: selectedSize, color: selectedColor || 'N/A' });
    localStorage.setItem('urbn_cart', JSON.stringify(existingCart));

    setModalMessage(`[ CATALOG MODE: "${product.title}" (SIZE: ${selectedSize}${selectedColor ? `, COLOR: ${selectedColor}` : ''}) ADDED TO INQUIRY BAG. ONLINE CHECKOUT COMING SOON! ]`);
    setShowModal(true);
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const currentDisplayImage = activeGalleryImages[selectedImage] || activeGalleryImages[0] || '/placeholder-1.jpg';

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom selection:bg-black selection:text-white pt-24 md:pt-32 overflow-x-hidden relative">
      
      {showModal && (
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black p-8 max-w-md w-full shadow-2xl space-y-4 text-center">
            <span className="text-[10px] tracking-widest text-[#ED3833] font-bold uppercase">[ SYSTEM NOTICE ]</span>
            <h3 className="font-thunder text-3xl font-black uppercase">URBN CATALOG VIEW</h3>
            <p className="text-xs uppercase tracking-wider text-neutral-700 leading-relaxed">
              {modalMessage}
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-black text-white py-3 text-xs uppercase font-bold tracking-widest hover:bg-[#ED3833] transition-colors cursor-pointer"
            >
              CONTINUE BROWSING →
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
        <Link href="/" className="hover:text-black transition-colors">[ HOME ]</Link> / <Link href="/shop" className="hover:text-black transition-colors">[ SHOP ]</Link> / <span className="text-black font-bold break-all">[ {product.title} ]</span>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pb-16">
        
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 no-scrollbar">
            {activeGalleryImages.map((imgSrc, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 border-2 transition-all cursor-pointer overflow-hidden bg-neutral-200 hover:scale-105 ${
                  selectedImage === idx ? 'border-black scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={imgSrc} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="relative flex-1 bg-neutral-200 aspect-[3/4] overflow-hidden border border-black/10 w-full group">
            <img src={currentDisplayImage} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

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

          {/* Size Selection with Sold-Out Status */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs uppercase tracking-widest">
              <span className="font-bold">[ SELECT SIZE ]</span>
              <button onClick={() => setIsSizeGuideOpen(true)} className="underline text-neutral-600 hover:text-black cursor-pointer font-bold transition-colors">
                [ SIZE GUIDE → ]
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes && Object.entries(product.sizes).map(([size, qty]) => {
                const isSoldOut = (qty as number) <= 0;
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={isSoldOut}
                    onClick={() => !isSoldOut && setSelectedSize(size)}
                    className={`py-3 px-1 text-[11px] sm:text-xs font-mono-custom tracking-widest uppercase border transition-all flex flex-col items-center justify-center ${
                      isSoldOut 
                        ? 'bg-neutral-200 text-neutral-400 border-neutral-300 cursor-not-allowed line-through' 
                        : isSelected 
                          ? 'bg-black text-white border-black font-bold shadow-sm cursor-pointer' 
                          : 'bg-transparent border-black/30 text-neutral-800 hover:border-black cursor-pointer'
                    }`}
                  >
                    <span>[ {size} ]</span>
                    <span className="text-[9px] mt-0.5 tracking-normal opacity-80">
                      {isSoldOut ? 'SOLD OUT' : 'AVAILABLE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 py-2 px-1">
              <span className="text-xs uppercase tracking-widest font-bold">[ SELECT COLOR: <span className="text-neutral-600 font-normal">{selectedColor}</span> ]</span>
              <div className="flex flex-wrap gap-3 pt-2">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => handleColorSelect(col.name, col.images)}
                    className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer shadow-xs ${selectedColor === col.name ? 'border-black scale-110 ring-2 ring-black/20' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    aria-label={col.name}
                  />
                ))}
              </div>
            </div>
          )}

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
              [ GET CUSTOM QUOTE ON WHATSAPP ]
            </button>
          </div>

          <div className="border-t border-black/10 divide-y divide-black/10 pt-4">
            <div className="py-3">
              <button onClick={() => toggleAccordion(1)} className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold cursor-pointer hover:text-[#ED3833] transition-colors">
                <span>[ 01. DETAILS ]</span>
                <span className="text-lg font-mono">{openAccordions[1] ? '−' : '+'}</span>
              </button>
              {openAccordions[1] && <p className="text-xs text-neutral-600 mt-2 uppercase tracking-wider leading-relaxed">{product.details || "Wide-leg silhouette with architectural folds. Premium fabric."}</p>}
            </div>

            <div className="py-3">
              <button onClick={() => toggleAccordion(2)} className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold cursor-pointer hover:text-[#ED3833] transition-colors">
                <span>[ 02. CARE ]</span>
                <span className="text-lg font-mono">{openAccordions[2] ? '−' : '+'}</span>
              </button>
              {openAccordions[2] && <p className="text-xs text-neutral-600 mt-2 uppercase tracking-wider leading-relaxed">{product.care || "Dry clean only. Do not bleach."}</p>}
            </div>

            <div className="py-3">
              <button onClick={() => toggleAccordion(3)} className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold cursor-pointer hover:text-[#ED3833] transition-colors">
                <span>[ 03. DELIVERY ]</span>
                <span className="text-lg font-mono">{openAccordions[3] ? '−' : '+'}</span>
              </button>
              {openAccordions[3] && <p className="text-xs text-neutral-600 mt-2 uppercase tracking-wider leading-relaxed">{product.delivery || "Ships in 1–2 business days."}</p>}
            </div>
          </div>

        </div>
      </section>

      <div className="w-full h-44 sm:h-56 pointer-events-none" aria-hidden="true" />
      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />

      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-md bg-[#FFF9F7] h-full p-6 sm:p-8 flex flex-col shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center border-b border-black/20 pb-4 mb-6">
              <h3 className="font-thunder text-2xl font-black uppercase tracking-wider">[ SIZE GUIDE ]</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-xl font-bold hover:text-[#ED3833] cursor-pointer">✕</button>
            </div>
            <div className="space-y-4 font-mono-custom text-xs uppercase tracking-wider text-neutral-700 leading-relaxed">
              <p>Find your precise measurements below for the perfect oversized architectural fit.</p>
              <div className="border border-black/20 p-4 space-y-2 bg-white shadow-xs">
                <div className="flex justify-between border-b pb-1 font-bold"><span>Size</span><span>Chest / Waist</span></div>
                <div className="flex justify-between"><span>S</span><span>38" / 30"</span></div>
                <div className="flex justify-between"><span>M</span><span>40" / 32"</span></div>
                <div className="flex justify-between"><span>L</span><span>42" / 34"</span></div>
                <div className="flex justify-between"><span>XL</span><span>44" / 36"</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}