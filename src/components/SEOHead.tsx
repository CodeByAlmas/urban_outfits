'use client';

import React from 'react';

export default function SEOHead() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "URBAN OUTFITS",
    "alternateName": "URBN",
    "url": "https://urbanoutfits.in",
    "logo": "https://urbanoutfits.in/logo.png",
    "description": "Structure meets street. Premium wearable avant-garde streetwear, tactical outerwear, oversized hoodies, and urban aesthetics designed in India.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kanpur",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.instagram.com/urbanoutfits_/",
      "https://www.youtube.com/@UrbanOutfits_13"
    ]
  };

  return (
    <>
      <title>URBAN OUTFITS // Wearable Avant-Garde & Streetwear</title>
      <meta name="description" content="Structure meets street. Discover premium streetwear, tactical outerwear, oversized hoodies, and urban aesthetics from Urban Outfits." />
      
      {/* Hyper-local Indian consumer search keywords */}
      <meta name="keywords" content="streetwear brand India, oversized t shirts India, best hoodie brand online, cargo pants for men shopping, baggy jeans online India, techwear jacket India, cool streetwear clothing, urban outfits India, affordable streetwear store, stylish mens wear online" />
      
      {/* Browser Tab Favicon */}
      <link rel="icon" href="/logo.png" type="image/png" />
      <link rel="shortcut icon" href="/logo.png" type="image/png" />
      
      {/* OpenGraph / Social Media SEO */}
      <meta property="og:title" content="URBAN OUTFITS // Wearable Avant-Garde & Streetwear" />
      <meta property="og:description" content="Structure meets street. Premium streetwear and urban aesthetics." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://urbanoutfits.in" />
      
      {/* JSON-LD Structured Data for AEO & GEO Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}