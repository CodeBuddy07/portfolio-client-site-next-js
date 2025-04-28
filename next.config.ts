import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.com',
      },
    ], // Add the external image domain here
  },
};

export default nextConfig;
