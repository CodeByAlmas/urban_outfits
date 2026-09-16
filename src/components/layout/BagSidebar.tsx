'use client';

import React from 'react';

interface BagSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BagSidebar({ isOpen, onClose }: BagSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
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
            <span className="font-mono-custom text-xs uppercase font-bold tracking-widest text-[#ED3833]">
              YOUR BAG
            </span>
            <span className="font-mono-custom text-xs uppercase font-bold tracking-widest text-black">
              [ 0 - ITEMS ]
            </span>
            <button 
              onClick={onClose}
              className="text-black hover:text-[#ED3833] transition-colors font-mono-custom text-2xl p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Body (Empty State) */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="font-mono-custom text-xs uppercase tracking-[0.2em] font-bold text-black mb-8">
              YOUR CART IS EMPTY.
            </p>

            {/* Continue Shopping Button */}
            <button 
              onClick={onClose}
              className="bg-black text-white font-mono-custom text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#ED3833] transition-colors cursor-pointer rounded-[255px_15px_225px_15px/15px_225px_15px_255px] shadow-md"
            >
              [ CONTINUE SHOPPING ]
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}