'use client';

import React, { useState, useEffect } from 'react';

export default function StairsPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    // 10 seconds (10000ms) total duration for 1 to 100 progress
    const totalDuration = 10000; 
    const intervalTime = totalDuration / 100; // 100ms per step

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400); // Chhota sa fade out buffer
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      
      {/* Background Videos: Desktop & Mobile Separate */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Desktop Video */}
        <video
          src="/desktop-preloader.mp4"
          autoPlay
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover filter grayscale contrast-125 brightness-75"
        />
        {/* Mobile Video */}
        <video
          src="/mobile-preloader.mp4"
          autoPlay
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover filter grayscale contrast-125 brightness-75"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Stairs Panels Animation Effect */}
      <div className="absolute inset-0 grid grid-cols-5 z-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full bg-black transition-transform duration-700 ease-in-out ${
              progress === 100 ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          />
        ))}
      </div>

      {/* Foreground Content: Brutalist Loading Progress Line & Counter */}
      <div className="relative z-20 flex flex-col items-center justify-center space-y-4 px-6 text-white w-full max-w-md">
        
        <div className="font-mono-custom text-xs uppercase tracking-[0.3em] text-neutral-400">
          [ LOADING EXPERIENCE ]
        </div>

        {/* 1 - 100 Number Counter */}
        <div className="font-thunder text-7xl sm:text-9xl font-black tracking-tighter text-white">
          {progress < 10 ? `0${progress}` : progress}%
        </div>

        {/* Progress Line Bar */}
        <div className="w-full h-1 bg-white/20 relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-[#ED3833] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-neutral-400 pt-2">
          URBN // SS '26 PRODUCTION
        </div>

      </div>

    </div>
  );
}