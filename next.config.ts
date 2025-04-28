import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.com',
      },
      {
        protocol: 'https',
        hostname: '*.ibb.co',
      },
      {
        protocol: 'https',
        hostname: '*.example.com', // Replace with your actual domain
      }
    ], // Add the external image domain here
  },
};

export default nextConfig;
