'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  // States for navbar style hover extension effect
  const [colText, setColText] = useState("COLLECTIONS");
  const [campText, setCampText] = useState("CAMPAIGN");
  const [whoText, setWhoText] = useState("WHO WE ARE");
  const [contactText, setContactText] = useState("CONTACT");
  const [pubText, setPubText] = useState("PUBLICATIONS");
  const [saleText, setSaleText] = useState("SALE");

  // Reset hover text states whenever menu closes so nothing gets stuck
  const handleMenuClose = () => {
    setColText("COLLECTIONS");
    setCampText("CAMPAIGN");
    setWhoText("WHO WE ARE");
    setContactText("CONTACT");
    setPubText("PUBLICATIONS");
    setSaleText("SALE");
    onClose();
  };

  // Scroll hone par menu automatically close karne ke liye event listener
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        handleMenuClose();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Framer Motion container variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[45] bg-[#FFF9F7] text-black flex flex-col justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-6 overflow-y-auto select-none pointer-events-auto"
        >
          {/* Top Bar spacing to match navbar */}
          <div className="flex items-start justify-between w-full uppercase font-mono-custom text-xs tracking-widest opacity-0 pointer-events-none pt-2">
            <div>MENU --</div>
            <div>URBN</div>
            <div>BAG.0</div>
          </div>

          {/* Main Body Content with Full Mobile Responsiveness */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 flex-1 items-center my-auto py-4 gap-6 lg:gap-0 max-w-[1400px] mx-auto w-full">
            
            {/* Left Side: Menu List with Group Hover Red Sync for both Text & Numbers */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="lg:col-span-5 relative flex flex-col space-y-2 sm:space-y-3 font-thunder uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl font-extrabold pl-1 sm:pl-2 md:pl-6"
            >

              {/* 01. Collections */}
              <motion.div variants={itemVariants} className="flex items-center justify-between relative z-10 max-w-lg group">
                <Link 
                  href="/collections" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setColText("COLLECTIONSSS")}
                  onMouseLeave={() => setColText("COLLECTIONS")}
                  className="group-hover:text-[#ED3833] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">[</span>
                  <span className="group-hover:text-[#ED3833] transition-colors">{colText}</span>
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">]</span>
                </Link>
                <Link 
                  href="/collections" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setColText("COLLECTIONSSS")}
                  onMouseLeave={() => setColText("COLLECTIONS")}
                  className="font-mono-custom text-[10px] sm:text-[11px] md:text-xs text-neutral-400 group-hover:text-[#ED3833] transition-colors tracking-widest cursor-pointer"
                >
                  [ 01 ]
                </Link>
              </motion.div>

              {/* 02. Campaign */}
              <motion.div variants={itemVariants} className="flex items-center justify-between relative z-10 max-w-lg group">
                <Link 
                  href="/campaigns" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setCampText("CAMPAIGNNN")}
                  onMouseLeave={() => setCampText("CAMPAIGN")}
                  className="group-hover:text-[#ED3833] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">[</span>
                  <span className="group-hover:text-[#ED3833] transition-colors">{campText}</span>
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">]</span>
                </Link>
                <Link 
                  href="/campaign" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setCampText("CAMPAIGNNN")}
                  onMouseLeave={() => setCampText("CAMPAIGN")}
                  className="font-mono-custom text-[10px] sm:text-[11px] md:text-xs text-neutral-400 group-hover:text-[#ED3833] transition-colors tracking-widest cursor-pointer"
                >
                  [ 02 ]
                </Link>
              </motion.div>

              {/* 03. Who We Are */}
              <motion.div variants={itemVariants} className="flex items-center justify-between relative z-10 max-w-lg group">
                <Link 
                  href="/about" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setWhoText("WHO WE AREEE")}
                  onMouseLeave={() => setWhoText("WHO WE ARE")}
                  className="group-hover:text-[#ED3833] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">[</span>
                  <span className="group-hover:text-[#ED3833] transition-colors">{whoText}</span>
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">]</span>
                </Link>
                <Link 
                  href="/about" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setWhoText("WHO WE AREEE")}
                  onMouseLeave={() => setWhoText("WHO WE ARE")}
                  className="font-mono-custom text-[10px] sm:text-[11px] md:text-xs text-neutral-400 group-hover:text-[#ED3833] transition-colors tracking-widest cursor-pointer"
                >
                  [ 03 ]
                </Link>
              </motion.div>

              {/* 04. Contact */}
              <motion.div variants={itemVariants} className="flex items-center justify-between relative z-10 max-w-lg group">
                <Link 
                  href="/contact" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setContactText("CONTACTTT")}
                  onMouseLeave={() => setContactText("CONTACT")}
                  className="group-hover:text-[#ED3833] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">[</span>
                  <span className="group-hover:text-[#ED3833] transition-colors">{contactText}</span>
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">]</span>
                </Link>
                <Link 
                  href="/contact" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setContactText("CONTACTTT")}
                  onMouseLeave={() => setContactText("CONTACT")}
                  className="font-mono-custom text-[10px] sm:text-[11px] md:text-xs text-neutral-400 group-hover:text-[#ED3833] transition-colors tracking-widest cursor-pointer"
                >
                  [ 04 ]
                </Link>
              </motion.div>

              {/* 05. Publications */}
              <motion.div variants={itemVariants} className="flex items-center justify-between relative z-10 max-w-lg group">
                <Link 
                  href="/publications" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setPubText("PUBLICATIONSSS")}
                  onMouseLeave={() => setPubText("PUBLICATIONS")}
                  className="group-hover:text-[#ED3833] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">[</span>
                  <span className="group-hover:text-[#ED3833] transition-colors">{pubText}</span>
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">]</span>
                </Link>
                <Link 
                  href="/publications" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setPubText("PUBLICATIONSSS")}
                  onMouseLeave={() => setPubText("PUBLICATIONS")}
                  className="font-mono-custom text-[10px] sm:text-[11px] md:text-xs text-neutral-400 group-hover:text-[#ED3833] transition-colors tracking-widest cursor-pointer"
                >
                  [ 05 ]
                </Link>
              </motion.div>

              {/* 06. Sale */}
              <motion.div variants={itemVariants} className="flex items-center justify-between relative z-10 max-w-lg group">
                <Link 
                  href="/sale" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setSaleText("SALEEE")}
                  onMouseLeave={() => setSaleText("SALE")}
                  className="group-hover:text-[#ED3833] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">[</span>
                  <span className="group-hover:text-[#ED3833] transition-colors">{saleText}</span>
                  <span className="text-neutral-400 font-mono-custom text-sm md:text-lg group-hover:text-[#ED3833] transition-colors">]</span>
                </Link>
                <Link 
                  href="/sale" 
                  onClick={handleMenuClose}
                  onMouseEnter={() => setSaleText("SALEEE")}
                  onMouseLeave={() => setSaleText("SALE")}
                  className="font-mono-custom text-[10px] sm:text-[11px] md:text-xs text-neutral-400 group-hover:text-[#ED3833] transition-colors tracking-widest cursor-pointer"
                >
                  [ 06 ]
                </Link>
              </motion.div>

            </motion.div>

            {/* Vertical Divider Line */}
            <div className="hidden lg:flex lg:col-span-2 justify-center items-center h-full relative">
              <div className="absolute inset-y-0 w-[1px] bg-black/25"></div>
              <span className="rotate-90 font-mono-custom text-[9px] tracking-[0.3em] uppercase text-neutral-500 whitespace-nowrap bg-[#FFF9F7] px-3 z-10">
                PEOPLE . PLACES . PERSPECTIVE . PROGRESS
              </span>
            </div>

            {/* Right Side: Stylish Skewed/Tilted Brutalist Video Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-5 h-full flex items-center justify-center px-2 sm:px-4"
            >
              <div className="w-full max-w-[380px] sm:max-w-[420px] h-[260px] sm:h-[340px] md:h-[420px] bg-black relative shadow-[0_30px_70px_rgba(0,0,0,0.4)] border-2 border-black p-2 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                {/* Gen-Z Corner Accents */}
                <span className="absolute -top-2.5 -left-2.5 text-black font-mono text-xs z-30 font-bold">+</span>
                <span className="absolute -top-2.5 -right-2.5 text-black font-mono text-xs z-30 font-bold">+</span>
                <span className="absolute -bottom-2.5 -left-2.5 text-black font-mono text-xs z-30 font-bold">+</span>
                <span className="absolute -bottom-2.5 -right-2.5 text-black font-mono text-xs z-30 font-bold">+</span>

                <div className="w-full h-full relative overflow-hidden bg-black">
                  <video 
                    src="/film-video2.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover filter grayscale contrast-150 brightness-95 scale-105 hover:scale-110 transition-transform duration-700"
                  />
                  {/* Scanline / Grain overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

                  <div className="absolute bottom-3 left-3 font-mono-custom text-[9px] text-white bg-black/90 px-2 py-1 tracking-[0.2em] border border-white/30 backdrop-blur-sm">
                    [ URBANOUTFIT_PREVIEW // V.02 ]
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Footer Links inside Overlay */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center font-mono-custom text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600 pt-3 sm:pt-4 border-t border-black/10 gap-2 sm:gap-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6">
              <Link href="/shipping" onClick={handleMenuClose} className="hover:text-black transition-colors">SHIPPING AND PAYMENT</Link>
              <Link href="/credits" onClick={handleMenuClose} className="hover:text-black transition-colors">CREDITS</Link>
              <Link href="/legal" onClick={handleMenuClose} className="hover:text-black transition-colors">TERMS AND CONDITIONS</Link>
            </div>
            <div>
              BUILT DIFFERENT.
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}