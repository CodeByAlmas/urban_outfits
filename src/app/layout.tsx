'use client';

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/FloatingActions";
import StairsPreloader from "@/components/StairsPreloader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body className="bg-[#FFF9F7] text-black antialiased selection:bg-black selection:text-white flex flex-col min-h-screen">
        
        {/* Cinematic Stairs Preloader */}
        <StairsPreloader />

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