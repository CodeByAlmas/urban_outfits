'use client';

import React, { useState } from 'react';

const faqs = [
  { id: "01", q: "HOW DO I PLACE A CUSTOM QUOTATION ORDER VIA WHATSAPP?", a: "Simply click the WhatsApp button on any product page. It will automatically transmit the item details, size, and color preferences directly to our team for instant confirmation." },
  { id: "02", q: "WHAT IS THE TYPICAL SHIPPING TIMELINE ACROSS INDIA?", a: "All orders are dispatched from our studio within 1–2 business days. Pan-India express delivery typically takes 3–5 business days depending on your location." },
  { id: "03", q: "ARE THERE ANY REFUNDS OR EXCHANGE POLICIES?", a: "We offer size exchanges within 7 days of delivery, provided the item is unworn with original tags intact. Custom pieces quoted via WhatsApp are evaluated case-by-case." },
  { id: "04", q: "HOW DO I CARE FOR MY URBN HEAVYWEIGHT APPAREL?", a: "We recommend machine washing cold inside out with like colors, and tumble drying on low or hang drying to preserve the premium fabric structure." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom pt-28 pb-16 px-4 sm:px-6 md:px-12 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto border-b border-black/20 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#ED3833] font-bold">[ 03. SUPPORT / FAQ ]</span>
        <h1 className="font-thunder text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mt-2 break-words">
          FREQUENTLY ASKED.
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mt-2 leading-relaxed">
          Everything you need to know about our drops, shipping, and custom WhatsApp quotes.
        </p>
      </div>

      {/* FAQ Accordions Grid */}
      <div className="max-w-4xl mx-auto space-y-4 mb-16">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.id} className="border border-black/20 bg-white p-5 sm:p-6 transition-all shadow-xs">
              <button 
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-start sm:items-center text-left text-xs sm:text-base font-bold uppercase tracking-wider cursor-pointer gap-4"
              >
                <span className="break-words">[ {faq.id} ] {faq.q}</span>
                <span className="text-lg sm:text-xl font-mono flex-shrink-0">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <p className="text-xs sm:text-sm text-neutral-600 mt-4 uppercase tracking-wider leading-relaxed border-t border-black/10 pt-4 break-words">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile-Only Bottom Spacer to prevent footer overlap */}
      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />
    </main>
  );
}