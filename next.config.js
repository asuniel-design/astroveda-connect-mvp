/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        pathname: '/**',
      },
    ],
    // Enable Turbopack image optimization
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;