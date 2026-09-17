'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import MenuOverlay from './MenuOverlay';
import SearchOverlay from './SearchOverlay';
import BagSidebar from './BagSidebar';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const [menuText, setMenuText] = useState("MENU+");
  const [shopText, setShopText] = useState("SHOP ALL");
  const [catText, setCatText] = useState("CATEGORIES+");
  const [logoText, setLogoText] = useState("URBAN OUTFITS");
  const [bagText, setBagText] = useState("BAG.0");
  const [searchText, setSearchText] = useState("SEARCH");
  const [favHover, setFavHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    setMenuText(nextState ? "MENU-" : "MENU+");
  };

  const handleCategoriesClick = () => {
    if (pathname === '/') {
      const element = document.getElementById('categories-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#categories-section');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-4 sm:px-6 md:px-12 py-3 sm:py-6 flex items-start justify-between uppercase font-mono-custom text-[10px] sm:text-xs tracking-widest bg-transparent z-50 select-none pointer-events-auto border-none">
        
        {/* LEFT SIDE */}
        <div className="relative flex flex-col md:flex-row items-start gap-0.5 md:gap-0 h-auto md:h-12">

          {/* MENU */}
          <button 
            onClick={handleMenuClick}
            onMouseEnter={() => setMenuText(isMenuOpen ? "MENUUU-" : "MENUUU+")}
            onMouseLeave={() => setMenuText(isMenuOpen ? "MENU-" : "MENU+")}
            className="text-left hover:text-[#ED3833] transition-colors whitespace-nowrap cursor-pointer"
          >
            {menuText}
          </button>

          {/* SHOP (desktop untouched) */}
          <Link 
            href="/shop"
            onMouseEnter={() => setShopText("SHOP ALLL")}
            onMouseLeave={() => setShopText("SHOP ALL")}
            className={`hidden md:block absolute left-0 text-left hover:text-[#ED3833] transition-all duration-700 ease-in-out whitespace-nowrap ${
              isScrolled ? 'translate-x-24 translate-y-0' : 'translate-x-0 translate-y-6'
            }`}
          >
            {shopText}
          </Link>

          {/* CATEGORIES (ONLY MOBILE FIX) */}
          <button 
            onClick={handleCategoriesClick}
            onMouseEnter={() => setCatText("CATEGORIESSS+")}
            onMouseLeave={() => setCatText("CATEGORIES+")}
            className={`
              text-left hover:text-[#ED3833] whitespace-nowrap cursor-pointer
              transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

              ${isScrolled 
                ? 'translate-x-12 -translate-y-4'   // slide right to MENU
                : 'translate-x-0 translate-y-0'
              }

              md:absolute
              ${isScrolled 
                ? 'md:translate-x-48 md:translate-y-0' 
                : 'md:translate-x-0 md:translate-y-12'
              }
            `}
          >
            {catText}
          </button>

          {/* EST (desktop untouched) */}
          <div 
            className={`hidden md:block absolute text-neutral-500 transition-all duration-700 ease-in-out whitespace-nowrap ${
              isScrolled ? 'translate-x-82 translate-y-0 pt-0.5' : 'translate-x-28 translate-y-0 pt-0.5'
            }`}
          >
            [ EST.2023 ]
          </div>
        </div>

        {/* LOGO (untouched) */}
        <div className={`absolute left-1/2 -translate-x-1/2 top-3 sm:top-6 transition-all duration-700 ease-in-out ${isScrolled ? 'scale-75 sm:scale-90 top-2.5 sm:top-5' : ''}`}>
          <Link 
            href="/"
            onMouseEnter={() => setLogoText("URBAN OUTFITSSS")}
            onMouseLeave={() => setLogoText("URBAN OUTFITS")}
            className="font-thunder text-[12px] sm:text-base md:text-2xl tracking-widest font-extrabold uppercase text-black hover:text-[#ED3833] transition-colors whitespace-nowrap"
          >
            {logoText}
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col md:flex-row items-end md:items-start gap-0.5 md:gap-0 h-auto md:h-12 justify-end w-auto md:w-48 z-50">

          {/* BAG */}
          <button 
            onClick={() => setIsBagOpen(true)}
            onMouseEnter={() => setBagText("BAG.000")}
            onMouseLeave={() => setBagText("BAG.0")}
            className="text-right hover:text-[#ED3833] transition-colors whitespace-nowrap cursor-pointer"
          >
            {bagText}
          </button>

          {/* SEARCH (ONLY MOBILE FIX) */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            onMouseEnter={() => setSearchText("SEARCHHH")}
            onMouseLeave={() => setSearchText("SEARCH")}
            className={`
              text-right hover:text-[#ED3833] whitespace-nowrap cursor-pointer
              transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

              ${isScrolled 
                ? '-translate-x-12 -translate-y-4'  // slide left of BAG
                : 'translate-x-0 translate-y-0'
              }

              md:absolute md:right-0
              ${isScrolled 
                ? 'md:-translate-x-20 md:translate-y-0' 
                : 'md:translate-x-0 md:translate-y-6'
              }
            `}
          >
            {searchText}
          </button>

          {/* FAVORITES (desktop untouched) */}
          <Link 
            href="/favorites"
            onMouseEnter={() => setFavHover(true)}
            onMouseLeave={() => setFavHover(false)}
            className={`hidden md:block absolute right-0 text-right hover:text-[#ED3833] transition-all duration-700 ease-in-out whitespace-nowrap ${
              isScrolled ? '-translate-x-40 translate-y-0' : 'translate-x-0 translate-y-12'
            }`}
          >
            {favHover ? "FAVORITES.000" : "FAVORITES.0"}
          </Link>
        </div>

      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <BagSidebar isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />
    </>
  );
}