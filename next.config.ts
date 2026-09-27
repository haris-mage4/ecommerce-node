import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server from other devices on the local network
  allowedDevOrigins: ['192.168.100.129'],
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
