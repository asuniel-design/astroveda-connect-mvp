/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration
  turbopack: {
    // Root directory for Turbopack resolution (avoid multiple lockfiles warning)
    root: process.cwd(),
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