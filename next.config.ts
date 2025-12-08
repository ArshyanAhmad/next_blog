import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Remove or comment out useCache if you don't want experimental flags
    // useCache: true,
  },
  // Optional: revalidate defaults (for ISR)
  revalidate: 86400, // 24 hours in seconds
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
