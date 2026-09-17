'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger transition curtain on every route change
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 700); // 0.7s total transition window

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {children}

      {/* Gen-Z Brutalist Slats Curtain Overlay (Responsive: 3 columns on mobile, 5 columns on desktop) */}
      <div 
        className={`fixed inset-0 z-[998] pointer-events-none grid grid-cols-3 md:grid-cols-5 overflow-hidden transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full bg-black transform transition-transform duration-500 ease-in-out ${
              // Hide the last 2 columns on small screens so mobile has cleaner 3 slats, 5 slats on md+
              i >= 3 ? 'hidden md:block' : ''
            } ${
              isAnimating ? 'translate-y-0' : '-translate-y-full'
            }`}
            style={{ transitionDelay: `${i * 60}ms` }}
          />
        ))}

        {/* Quick Branded Flash Text in the Center during transition (Responsive text sizing) */}
        <div className={`absolute inset-0 flex items-center justify-center px-4 text-center pointer-events-none transition-opacity duration-200 ${
          isAnimating ? 'opacity-20 md:opacity-15 delay-250' : 'opacity-0'
        }`}>
          <span className="font-thunder text-white text-4xl sm:text-6xl md:text-9xl uppercase tracking-tighter">
            [ URBN // LOADING ]
          </span>
        </div>
      </div>
    </>
  );
}