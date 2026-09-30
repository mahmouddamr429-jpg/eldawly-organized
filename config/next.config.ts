import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel deployment: NO output:standalone — it breaks serverless functions */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
