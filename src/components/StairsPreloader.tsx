'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function StairsPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 10 seconds total duration (10000ms) mapped precisely to 100 steps
    const totalDuration = 10000;
    const intervalTime = totalDuration / 100;

    if (desktopVideoRef.current) {
      desktopVideoRef.current.currentTime = 0;
      desktopVideoRef.current.play().catch(() => {});
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.currentTime = 0;
      mobileVideoRef.current.play().catch(() => {});
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  // Dynamic scaling for percentage text: grows smoothly from small to large as it reaches 100%
  const currentScale = 0.7 + (progress / 100) * 0.55;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-white select-none pointer-events-auto">
      
      {/* 1. Background Videos with Loop enabled */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Desktop Video */}
        <video
          ref={desktopVideoRef}
          src="/desktop-preloader.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Mobile Video */}
        <video
          ref={mobileVideoRef}
          src="/mobile-preloader.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover"
        />
      </div>

      {/* Top Header info (Black text for white background + Initializing text shifted here) */}
      <div className="relative z-20 w-full px-6 sm:px-12 pt-6 flex justify-between items-center text-black font-mono-custom text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">
        <span>[ URBN // PREVIEW ]</span>
        <span className="hidden sm:inline text-neutral-600">INITIALIZING CINEMATIC ENVIRONMENT...</span>
        <span>EXPERIENCE SYSTEM</span>
      </div>

      {/* Empty spacer so video center remains completely clean */}
      <div className="relative z-20 w-full flex-1 pointer-events-none"></div>

      {/* Bottom Area: Red Progress Line at absolute edge + Number tracking with growing scale */}
      <div className="relative z-30 w-full pb-0 px-0 flex flex-col">
        
        {/* Percentage Counter following the red line edge, growing in size as it progresses */}
        <div className="relative w-full h-16 px-4">
          <div 
            className="absolute bottom-1 transition-all duration-75 ease-linear transform -translate-x-1/2 flex items-baseline"
            style={{ left: `${progress}%` }}
          >
            <span 
              className="font-thunder font-black tracking-tighter text-black text-3xl sm:text-5xl drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] transition-transform duration-75"
              style={{ transform: `scale(${currentScale})`, transformOrigin: 'bottom center' }}
            >
              {progress < 10 ? `0${progress}` : progress}
              <span className="text-[#ED3833] ml-0.5">%</span>
            </span>
          </div>
        </div>

        {/* Edge-to-Edge Red Progress Line (Zero margin/padding, pinned to absolute bottom) */}
        <div className="w-full h-2 bg-neutral-200 relative overflow-hidden rounded-none m-0 p-0">
          <div 
            className="absolute top-0 left-0 h-full bg-[#ED3833] transition-all duration-100 ease-linear shadow-[0_0_10px_#ED3833]"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

    </div>
  );
}