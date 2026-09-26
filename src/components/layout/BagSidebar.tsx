'use client';

import React, { useState, useEffect } from 'react';

interface BagSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BagSidebar({ isOpen, onClose }: BagSidebarProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCart = () => {
      try {
        const stored = localStorage.getItem('urbn_cart');
        if (stored) {
          setCartItems(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    };

    fetchCart();
    window.addEventListener('storage', fetchCart);
    window.addEventListener('urbn_cart_updated', fetchCart);

    return () => {
      window.removeEventListener('storage', fetchCart);
      window.removeEventListener('urbn_cart_updated', fetchCart);
    };
  }, [isOpen]);

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    try {
      localStorage.setItem('urbn_cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('urbn_cart_updated'));
    } catch (e) {}
  };

  const handleWhatsAppInquiry = () => {
    const phoneNumber = "7275023613";
    const itemList = cartItems.map((item, idx) => `${idx + 1}. *${item.title}* - Price: ${item.price} (Size: ${item.size}${item.color ? `, Color: ${item.color}` : ''})`).join('\n');
    const message = `Hello, I want to inquire about the following items from my URBN bag:\n\n${itemList}\n\nPlease share availability and details.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-mono-custom">
      {/* Dark Backdrop Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      ></div>

      {/* Right-to-Left Sliding Bag Sidebar */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-black shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-200">
            <span className="text-xs uppercase font-bold tracking-widest text-[#ED3833]">
              INQUIRY BAG
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-black">
              [ {cartItems.length < 10 ? `0${cartItems.length}` : cartItems.length} - ITEMS ]
            </span>
            <button 
              onClick={onClose}
              className="text-black hover:text-[#ED3833] transition-colors text-2xl p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-8">
                YOUR INQUIRY BAG IS EMPTY.
              </p>
              <button 
                onClick={onClose}
                className="bg-black text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#ED3833] transition-colors cursor-pointer shadow-md"
              >
                [ CONTINUE BROWSING ]
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 divide-y divide-neutral-200">
              {cartItems.map((item, idx) => (
                <div key={idx} className="pt-4 first:pt-0 flex justify-between items-start text-xs uppercase tracking-wider">
                  <div className="space-y-1">
                    <p className="font-bold text-black">{item.title}</p>
                    <p className="text-[#ED3833] font-bold">{item.price}</p>
                    <p className="text-[10px] text-neutral-600">Size: {item.size} {item.color ? `| Color: ${item.color}` : ''}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(idx)}
                    className="text-neutral-400 hover:text-[#ED3833] text-[10px] uppercase font-bold cursor-pointer underline"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          {cartItems.length > 0 && (
            <div className="px-6 py-6 border-t border-neutral-200 space-y-3">
              <button 
                onClick={handleWhatsAppInquiry}
                className="w-full bg-[#25D366] text-black hover:bg-[#20ba5a] py-4 text-xs uppercase tracking-widest font-extrabold transition-colors cursor-pointer shadow-md text-center"
              >
                [ SEND INQUIRY ON WHATSAPP ]
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-black text-white hover:bg-[#ED3833] py-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer text-center"
              >
                [ CONTINUE BROWSING ]
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}