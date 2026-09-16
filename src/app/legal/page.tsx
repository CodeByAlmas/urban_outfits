'use client';

import React from 'react';
import Link from 'next/link';

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom pt-28 pb-16 px-4 sm:px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto border-b border-black/20 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#ED3833] font-bold">[ LEGAL & COMPLIANCE ]</span>
        <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider mt-2 break-words">
          TERMS & PRIVACY POLICY.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-2 leading-relaxed">
          Last updated: September 2026. Guidelines governing user data, purchases, and brand interactions.
        </p>
      </div>

      {/* Content Sections Grid */}
      <div className="max-w-4xl mx-auto space-y-6 mb-16">
        
        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 01 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">INTRODUCTION & ACCEPTANCE</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            Welcome to URBN (urbn.studio). By accessing our website, browsing our collections, or utilizing our WhatsApp quotation and local storage features, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 02 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">COLLECTION OF CUSTOMER DATA</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            We collect personal information that you voluntarily provide when expressing interest in our products, participating in website activities, or contacting us via WhatsApp or our contact form. This data may include your name, contact preferences, and sizing requirements.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 03 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">LOCAL STORAGE & PREFERENCES</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            Our platform utilizes browser LocalStorage to store your shopping bag items, cart counts, and saved favorites locally on your device for a seamless experience. This data is managed directly by your browser storage.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 04 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">PRICING & ORDERS (INR)</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            All prices displayed on URBN are quoted in Indian Rupees (INR) and are inclusive of applicable taxes unless specified otherwise. We reserve the right to modify prices or stock statuses at any time via our secure admin dashboard.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 05 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">GOVERNING LAW</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws of India. Any legal disputes or claims shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
          </p>
        </div>

      </div>

      {/* Mobile-Only Bottom Spacer to prevent footer overlap */}
      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />
    </main>
  );
}