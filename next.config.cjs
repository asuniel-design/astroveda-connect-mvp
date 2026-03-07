/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // Enable Turbopack
      enabled: true,
      // Root directory for Turbopack resolution
      root: process.cwd(),
    },
  },
  // Enable Turbopack in development
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  images: {
    domains: ['images.unsplash.com', 'assets.vercel.com'],
    // Enable Turbopack image optimization
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;