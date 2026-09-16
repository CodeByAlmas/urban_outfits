import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack disable karne ke liye standard config
  webpack: (config) => {
    return config;
  },
};

export default function(phase: string) {
  return nextConfig;
};