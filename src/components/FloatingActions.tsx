'use client';

import React, { useState } from 'react';

export default function FloatingActions() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState('Custom Quotation / Pricing');
  const [customMessage, setCustomMessage] = useState('');

  const storeOwnerWhatsApp = "7275023613";
  const storeGoogleMapsUrl = "https://www.google.com/maps/place/URBAN+OUTFITS/@26.4288102,80.3919799,17z/data=!3m1!4b1!4m6!3m5!1s0x399c41f2dc5d29d7:0xff1f0c6f4c08675d!8m2!3d26.4288054!4d80.3945548!16s%2Fg%2F11y6nvvt0t?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D";
  const storeInstagramUrl = "https://www.instagram.com/urbanoutfits_";

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*URBN Inquiry*%0A*Topic:* ${inquiryType}%0A*Message:* ${customMessage || 'Hello, I would like to know more about your streetwear collection.'}`;
    window.open(`https://wa.me/${storeOwnerWhatsApp}?text=${text}`, '_blank');
    setIsWhatsAppOpen(false);
    setCustomMessage('');
  };

  return (
    <>
      {/* Floating Action Buttons Container (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 font-mono-custom select-none">
        
        {/* Google Maps Store Locator Button (Google Maps Red Theme) */}
        <a 
          href={storeGoogleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-[#EA4335] text-white border-2 border-black flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 group cursor-pointer"
          title="View Store Location on Google Maps"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </a>

        {/* Instagram Profile Link Button (Instagram Gradient Theme) */}
        <a 
          href={storeInstagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white border-2 border-black flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 group cursor-pointer"
          title="Follow Us on Instagram"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        {/* WhatsApp Inquiry Toggle Button */}
        <button 
          onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
          className="w-12 h-12 bg-[#25D366] text-black border-2 border-black flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          title="Chat with Us on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.15-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </button>

      </div>

      {/* WhatsApp Inquiry Modal / Drawer */}
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-mono-custom">
          <div className="w-full max-w-md bg-[#FFF9F7] border-2 border-black p-6 shadow-2xl relative">
            
            <div className="flex justify-between items-center border-b border-black/20 pb-3 mb-4">
              <h3 className="font-thunder text-2xl font-black uppercase tracking-wider">[ INSTANT WHATSAPP CHAT ]</h3>
              <button 
                onClick={() => setIsWhatsAppOpen(false)}
                className="text-lg font-bold hover:text-[#ED3833] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4 text-xs uppercase tracking-wider">
              <div>
                <label className="block font-bold mb-1">[ SELECT INQUIRY TYPE ]</label>
                <select 
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-white border border-black p-2.5 font-mono-custom uppercase text-xs focus:outline-none"
                >
                  <option value="Custom Quotation / Pricing">Custom Quotation / Pricing</option>
                  <option value="Size & Fit Assistance">Size & Fit Assistance</option>
                  <option value="Bulk Order / B2B Inquiry">Bulk Order / B2B Inquiry</option>
                  <option value="General Store Inquiry">General Store Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">[ YOUR MESSAGE / DETAILS ]</label>
                <textarea 
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your requirements here..."
                  className="w-full bg-white border border-black p-2.5 font-mono-custom uppercase text-xs h-24 focus:outline-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#25D366] text-black border border-black py-3 font-extrabold uppercase tracking-widest hover:bg-[#20ba5a] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                START WHATSAPP CHAT →
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}