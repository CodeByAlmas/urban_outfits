import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack empty config addition to satisfy Next.js 16 compiler check
  turbopack: {},
  webpack: (config) => {
    return config;
  },
};

export default function(phase: string) {
  return nextConfig;
};