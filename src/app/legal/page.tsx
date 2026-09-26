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
          TERMS & CATALOG POLICY.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-2 leading-relaxed">
          Last updated: September 2026. Guidelines governing catalog browsing, WhatsApp inquiries, and brand terms.
        </p>
      </div>

      {/* Content Sections Grid */}
      <div className="max-w-4xl mx-auto space-y-6 mb-16">
        
        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 01 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">CATALOG MODE & NATURE OF BUSINESS</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            URBN (urbn.studio) operates strictly as a digital showcase and product catalog. We do not process direct online financial checkouts or store customer accounts on our servers. All product purchases and pricing quotations are processed directly via WhatsApp inquiries or direct brand communications.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 02 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">ZERO DATA HARVESTING & PRIVACY</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            We respect your privacy completely. We do not track, harvest, or store personal user data or deploy tracking cookies on our visitors. Any information you choose to share (such as sizing or shipping destination) during a WhatsApp quotation is handled privately between you and our sales desk.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 03 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">LOCAL STORAGE & PREFERENCES</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            Our platform utilizes your browser's internal LocalStorage strictly for local convenience—such as remembering your inquiry bag items and saved favorites right on your device. This data never leaves your browser and can be cleared at any time.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 04 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">PRICING & AVAILABILITY (INR)</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            All prices displayed across our catalog are quoted in Indian Rupees (INR) and are subject to verification during custom WhatsApp orders. We reserve the right to alter designs, collections, or availability without prior notice.
          </p>
        </div>

        <div className="border border-black/20 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-[10px] tracking-widest text-[#ED3833] font-bold">[ SECTION 05 ]</span>
          <h3 className="font-thunder text-2xl uppercase font-bold">GOVERNING LAW</h3>
          <p className="text-xs text-neutral-600 uppercase tracking-wider leading-relaxed">
            These terms are governed by the laws of India. Any disputes or brand inquiries shall fall under the exclusive jurisdiction of the courts located in New Delhi, India.
          </p>
        </div>

      </div>

      {/* Mobile-Only Bottom Spacer to prevent footer overlap */}
      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />
    </main>
  );
}