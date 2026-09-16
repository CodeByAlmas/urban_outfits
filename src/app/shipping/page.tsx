'use client';

import React from 'react';

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom pt-28 pb-16 px-4 sm:px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto border-b border-black/20 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#ED3833] font-bold">[ 03. SUPPORT / SHIPPING ]</span>
        <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider mt-2 break-words">
          SHIPPING & DISPATCH.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-2 leading-relaxed">
          Built for speed. Delivered with care across India and worldwide.
        </p>
      </div>

      {/* Grid Content */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        
        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-neutral-500 font-bold">[ 01 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">DOMESTIC (PAN-INDIA)</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            Standard express shipping across India takes 3 to 5 business days post-dispatch. All orders are securely packed in signature URBN packaging.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-neutral-500 font-bold">[ 02 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">INTERNATIONAL SHIPPING</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            Global shipping is available via DHL and FedEx. Delivery times range between 7 to 12 business days depending on customs clearance.
          </p>
        </div>

      </div>

      {/* Mobile-Only Bottom Spacer to prevent footer overlap */}
      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />
    </main>
  );
}