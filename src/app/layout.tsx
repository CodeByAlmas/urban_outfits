'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/FloatingActions";
import StairsPreloader from "@/components/StairsPreloader";
import SEOHead from "@/components/SEOHead";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saleActive, setSaleActive] = useState(false);
  const [saleText, setSaleText] = useState("⚡ FLASH DROP: FREE SHIPPING PAN-INDIA ON ORDERS ABOVE ₹2,999");
  const [saleBg, setSaleBg] = useState("#ED3833");

  useEffect(() => {
    const checkStatus = async () => {
      const isMaint = localStorage.getItem('urbn_maintenance_mode') === 'true';
      setMaintenanceMode(isMaint);

      // Fetch CMS settings directly from Supabase Cloud
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', 'urbn_cms_settings_meta')
        .maybeSingle();

      if (!error && data && data.description) {
        try {
          const cloudCms = JSON.parse(data.description);
          if (cloudCms.announcementText) setSaleText(cloudCms.announcementText);
          if (cloudCms.announcementBgColor) setSaleBg(cloudCms.announcementBgColor);
          if (cloudCms.saleModeActive !== undefined) setSaleActive(cloudCms.saleModeActive);
        } catch (e) {}
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en">
      <head>
        <SEOHead />
      </head>
      <body className="bg-[#FFF9F7] text-black antialiased selection:bg-black selection:text-white flex flex-col min-h-screen">
        
        {/* Cinematic Stairs Preloader (Skipped on admin) */}
        {!isAdminRoute && <StairsPreloader />}

        {/* Global Sale Conveyer Belt Banner (Appears on all pages if active & not on admin) */}
        {!isAdminRoute && saleActive && (
          <div 
            className="w-full text-white text-[11px] font-mono uppercase tracking-widest py-2.5 overflow-hidden whitespace-nowrap sticky top-0 z-50 shadow-md"
            style={{ backgroundColor: saleBg }}
          >
            <div className="inline-block animate-marquee font-bold">
              <span>{saleText}</span>
              <span className="mx-8">•</span>
              <span>{saleText}</span>
              <span className="mx-8">•</span>
              <span>{saleText}</span>
              <span className="mx-8">•</span>
              <span>{saleText}</span>
            </div>
          </div>
        )}

        {/* Global Maintenance Mode Overlay (Blocks website if maintenance is ON and not in admin) */}
        {!isAdminRoute && maintenanceMode ? (
          <div className="fixed inset-0 bg-[#FFF9F7] z-[99999] flex flex-col items-center justify-center p-6 text-center font-mono select-none">
            <span className="text-[10px] tracking-widest text-[#ED3833] font-bold mb-2 uppercase">[ SYSTEM STATUS // OFFLINE ]</span>
            <h1 className="font-thunder text-6xl sm:text-8xl font-black uppercase tracking-tight mb-4">URBN IS CURRENTLY ON MAINTENANCE</h1>
            <p className="text-xs uppercase tracking-widest text-neutral-600 max-w-md mb-8">
              We are upgrading our infrastructure. The system will be back online shortly. Thank you for your patience.
            </p>
            <div className="border border-black px-6 py-3 text-xs uppercase font-bold tracking-widest bg-black text-white">
              PLEASE CHECK BACK SOON
            </div>
          </div>
        ) : null}

        {/* Render Global Navbar only if NOT on admin route */}
        {!isAdminRoute && <Navbar />}

        {/* Dynamic Page Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Render Global Footer & Floating Actions only if NOT on admin route */}
        {!isAdminRoute && (
          <>
            <Footer />
            <FloatingActions />
          </>
        )}

      </body>
    </html>
  );
}