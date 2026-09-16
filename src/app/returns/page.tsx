'use client';

import React from 'react';

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom pt-28 pb-16 px-4 sm:px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto border-b border-black/20 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#ED3833] font-bold">[ 03. SUPPORT / RETURNS ]</span>
        <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider mt-2 break-words">
          EXCHANGES & RETURNS.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-2 leading-relaxed">
          Hassle-free 7-day window for size replacements and store credits.
        </p>
      </div>

      {/* Grid Content */}
      <div className="max-w-4xl mx-auto space-y-6 mb-16">
        
        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ POLICY 01 ] ELIGIBILITY</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">7-DAY SIZE EXCHANGE</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            Items must be unworn, unwashed, and returned with all original tags attached within 7 days of delivery. Custom WhatsApp quotation orders are non-refundable unless defective.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ POLICY 02 ] INITIATION</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">HOW TO REQUEST</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            To initiate an exchange, reach out to us directly through the WhatsApp floating widget on our site with your order number and required size change.
          </p>
        </div>

      </div>

      {/* Mobile-Only Bottom Spacer to prevent footer overlap */}
      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />
    </main>
  );
}