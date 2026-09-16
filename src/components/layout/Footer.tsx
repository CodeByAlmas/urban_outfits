'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  // States for footer text hover extension effect (Navbar style)
  const [allProdText, setAllProdText] = useState("All Products");
  const [newArrText, setNewArrText] = useState("New Arrivals");
  const [colText, setColText] = useState("Collections");
  const [saleText, setSaleText] = useState("Sale");

  const [whoText, setWhoText] = useState("Who We Are");
  const [storyText, setStoryText] = useState("Our Story");
  const [campText, setCampText] = useState("Campaign");
  const [careerText, setCareerText] = useState("Careers");

  const [contactText, setContactText] = useState("Contact");
  const [shippingText, setShippingText] = useState("Shipping");
  const [returnsText, setReturnsText] = useState("Returns");
  const [faqText, setFaqText] = useState("FAQ");

  return (
    <footer className="relative w-full overflow-hidden select-none -mt-[350px] sm:-mt-[420px] md:-mt-80 z-30 pointer-events-auto">
      
      {/* ================= MOBILE RESPONSIVE FOOTER (URBN Logo Protection) ================= */}
      <div className="block md:hidden relative w-full">
        <img 
          src="/footer-mobile-cutout.png" 
          alt="Footer Mobile Cutout" 
          className="w-full h-auto object-cover block select-none pointer-events-none"
        />

        {/* Absolute Positioning Layer */}
        <div className="absolute inset-0 max-w-7xl mx-auto w-full px-4 flex flex-col justify-end pb-8 sm:pb-12">
          
          {/* Grid pushed further up to keep left-bottom URBN logo completely clear */}
          <div className="grid grid-cols-2 gap-3 font-mono-custom mb-4 pt-40 sm:pt-52 w-full">
            
            {/* 01. Shop */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-neutral-400 text-[9px] tracking-widest">
                <span>01</span>
                <span className="text-white font-bold uppercase">SHOP</span>
              </div>
              <ul className="space-y-1 text-[9px] uppercase tracking-wider text-neutral-300">
                <li>
                  <Link href="/shop/all" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setAllProdText("All Productsss")} onMouseLeave={() => setAllProdText("All Products")}>
                    {allProdText}
                  </Link>
                </li>
                <li>
                  <Link href="/shop/new" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setNewArrText("New Arrivalsss")} onMouseLeave={() => setNewArrText("New Arrivals")}>
                    {newArrText}
                  </Link>
                </li>
                <li>
                  <Link href="/shop/collections" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setColText("Collectionsss")} onMouseLeave={() => setColText("Collections")}>
                    {colText}
                  </Link>
                </li>
                <li>
                  <Link href="/shop/sale" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setSaleText("Saleee")} onMouseLeave={() => setSaleText("Sale")}>
                    {saleText}
                  </Link>
                </li>
              </ul>
            </div>

            {/* 02. Company */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-neutral-400 text-[9px] tracking-widest">
                <span>02</span>
                <span className="text-white font-bold uppercase">COMPANY</span>
              </div>
              <ul className="space-y-1 text-[9px] uppercase tracking-wider text-neutral-300">
                <li>
                  <Link href="/about" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setWhoText("Who We Areee")} onMouseLeave={() => setWhoText("Who We Are")}>
                    {whoText}
                  </Link>
                </li>
                <li>
                  <Link href="/story" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setStoryText("Our Storyyy")} onMouseLeave={() => setStoryText("Our Story")}>
                    {storyText}
                  </Link>
                </li>
                <li>
                  <Link href="/campaign" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setCampText("Campaignnn")} onMouseLeave={() => setCampText("Campaign")}>
                    {campText}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setCareerText("Careersss")} onMouseLeave={() => setCareerText("Careers")}>
                    {careerText}
                  </Link>
                </li>
              </ul>
            </div>

            {/* 03. Support */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-neutral-400 text-[9px] tracking-widest">
                <span>03</span>
                <span className="text-white font-bold uppercase">SUPPORT</span>
              </div>
              <ul className="space-y-1 text-[9px] uppercase tracking-wider text-neutral-300">
                <li>
                  <Link href="/contact" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setContactText("Contacttt")} onMouseLeave={() => setContactText("Contact")}>
                    {contactText}
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setShippingText("Shippinggg")} onMouseLeave={() => setShippingText("Shipping")}>
                    {shippingText}
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setReturnsText("Returnsss")} onMouseLeave={() => setReturnsText("Returns")}>
                    {returnsText}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="inline-block transition-colors hover:text-white" onMouseEnter={() => setFaqText("FAQ_Q_Q")} onMouseLeave={() => setFaqText("FAQ")}>
                    {faqText}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Stay in the loop */}
            <div className="space-y-1">
              <h3 className="font-mono-custom text-[9px] uppercase tracking-[0.1em] font-bold text-white">
                STAY IN THE LOOP
              </h3>
              <p className="font-mono-custom text-[8px] uppercase tracking-wider text-neutral-300 leading-tight">
                New drops. Real stories.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="relative pt-0.5">
                <input 
                  type="email" 
                  placeholder="YOUR EMAIL" 
                  className="w-full bg-transparent border-b border-neutral-500 pb-0.5 font-mono-custom text-[9px] uppercase tracking-widest text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all duration-300"
                />
                <button type="submit" className="absolute right-0 bottom-0.5 text-neutral-300 text-[10px]">&rarr;</button>
              </form>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Built Different */}
          <div className="w-full flex justify-between items-end pt-2 border-t border-white/10 gap-2">
            <div className="font-mono-custom text-[8px] uppercase tracking-widest text-neutral-400">
              <p>© 2026 URBAN OUTFITS.</p>
            </div>
            <div className="text-right font-mono-custom text-[8px] uppercase tracking-[0.2em] text-neutral-300">
              BUILT DIFFERENT.
            </div>
          </div>

        </div>
      </div>

      {/* ================= DESKTOP FOOTER (100% UNTOUCHED) ================= */}
      <div className="hidden md:block relative w-full">
        <img 
          src="/footer-torn-cutout.png" 
          alt="Footer Torn Paper Cutout" 
          className="w-full h-auto object-cover block select-none pointer-events-none"
        />

        {/* Absolute Positioning Layer */}
        <div className="absolute inset-0 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-end pb-8 md:pb-12">
          
          {/* Main Content Grid: Exact position locked */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 font-mono-custom mb-10 md:mb-14 pt-32 md:pt-40 ml-auto w-full md:w-[68%] lg:w-[62%]">
            
            {/* 01. Shop */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-widest">
                <span>01</span>
                <span className="text-white font-bold uppercase">SHOP</span>
              </div>
              <ul className="space-y-2 text-[11px] md:text-xs uppercase tracking-wider text-neutral-300">
                <li>
                  <Link 
                    href="/shop" 
                    onMouseEnter={() => setAllProdText("All Productsss")}
                    onMouseLeave={() => setAllProdText("All Products")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {allProdText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/shop/new" 
                    onMouseEnter={() => setNewArrText("New Arrivalsss")}
                    onMouseLeave={() => setNewArrText("New Arrivals")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {newArrText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/collections" 
                    onMouseEnter={() => setColText("Collectionsss")}
                    onMouseLeave={() => setColText("Collections")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {colText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/shop/sale" 
                    onMouseEnter={() => setSaleText("Saleee")}
                    onMouseLeave={() => setSaleText("Sale")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {saleText}
                  </Link>
                </li>
              </ul>
            </div>

            {/* 02. Company */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-widest">
                <span>02</span>
                <span className="text-white font-bold uppercase">COMPANY</span>
              </div>
              <ul className="space-y-2 text-[11px] md:text-xs uppercase tracking-wider text-neutral-300">
                <li>
                  <Link 
                    href="/about" 
                    onMouseEnter={() => setWhoText("Who We Areee")}
                    onMouseLeave={() => setWhoText("Who We Are")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {whoText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/story" 
                    onMouseEnter={() => setStoryText("Our Storyyy")}
                    onMouseLeave={() => setStoryText("Our Story")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {storyText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/campaign" 
                    onMouseEnter={() => setCampText("Campaignnn")}
                    onMouseLeave={() => setCampText("Campaign")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {campText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/careers" 
                    onMouseEnter={() => setCareerText("Careersss")}
                    onMouseLeave={() => setCareerText("Careers")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {careerText}
                  </Link>
                </li>
              </ul>
            </div>

            {/* 03. Support */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-widest">
                <span>03</span>
                <span className="text-white font-bold uppercase">SUPPORT</span>
              </div>
              <ul className="space-y-2 text-[11px] md:text-xs uppercase tracking-wider text-neutral-300">
                <li>
                  <Link 
                    href="/contact" 
                    onMouseEnter={() => setContactText("Contacttt")}
                    onMouseLeave={() => setContactText("Contact")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {contactText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/shipping" 
                    onMouseEnter={() => setShippingText("Shippinggg")}
                    onMouseLeave={() => setShippingText("Shipping")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {shippingText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/returns" 
                    onMouseEnter={() => setReturnsText("Returnsss")}
                    onMouseLeave={() => setReturnsText("Returns")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {returnsText}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq" 
                    onMouseEnter={() => setFaqText("FAQQQ")}
                    onMouseLeave={() => setFaqText("FAQ")}
                    className="inline-block transition-colors hover:text-[#ED3833]"
                  >
                    {faqText}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Stay in the loop */}
            <div className="space-y-3">
              <h3 className="font-mono-custom text-xs uppercase tracking-[0.2em] font-bold text-white">
                STAY IN THE LOOP
              </h3>
              <p className="font-mono-custom text-[10px] md:text-[11px] uppercase tracking-wider text-neutral-300 leading-tight">
                New drops. Real stories. No spam.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="relative pt-1">
                <input 
                  type="email" 
                  placeholder="YOUR EMAIL" 
                  className="w-full bg-transparent border-b border-neutral-500 pb-1.5 font-mono-custom text-xs uppercase tracking-widest text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:tracking-[0.1em] transition-all duration-300"
                />
                <button 
                  type="submit" 
                  className="absolute right-0 bottom-1.5 text-neutral-300 hover:text-[#ED3833] hover:scale-110 transition-all duration-300 text-sm"
                  aria-label="Submit"
                >
                  &rarr;
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Bar: Copyright neatly placed below logo red line */}
          <div className="w-full flex flex-col md:flex-row justify-between items-end pt-4 gap-4">
            
            {/* Copyright Text */}
            <div className="font-mono-custom text-[10px] uppercase tracking-widest text-neutral-400 space-y-0.5 pl-1 pt-4">
              <p>© 2026 URBAN OUTFITS.</p>
              <p>ALL RIGHTS RESERVED.</p>
            </div>

            {/* Right Side: Social Icons & Built Different Tag */}
            <div className="flex items-center gap-6">
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/urbanoutfits_/" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-[#ED3833] hover:border-[#ED3833] hover:scale-105 transition-all duration-300 font-mono-custom text-[11px]">IG</a>
                <a href="#" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-[#ED3833] hover:border-[#ED3833] hover:scale-105 transition-all duration-300 font-mono-custom text-[11px]">X</a>
                <a href="https://www.youtube.com/@UrbanOutfits_13" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-[#ED3833] hover:border-[#ED3833] hover:scale-105 transition-all duration-300 font-mono-custom text-[11px]">YT</a>
                <a href="#" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-[#ED3833] hover:border-[#ED3833] hover:scale-105 transition-all duration-300 font-mono-custom text-[11px]">SP</a>
              </div>

              {/* Built Different Tag */}
              <div className="text-right font-mono-custom text-[10px] uppercase tracking-[0.25em] text-neutral-300">
                BUILT<br />DIFFERENT.
              </div>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}